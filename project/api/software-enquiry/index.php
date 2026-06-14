<?php
date_default_timezone_set('Asia/Kolkata');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-CSRF-Token");

// Handle CORS preflight request immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ─── Bootstrap ───────────────────────────────────────────────────────────────
$baseDir = __DIR__ . '/../../';
require_once $baseDir . 'config/Database.php';
require_once $baseDir . 'utils/Logger.php';
require_once $baseDir . 'services/EmailService.php';
require_once $baseDir . 'controllers/SoftwareEnquiryController.php';

// ─── Only accept POST from here on ───────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);
    exit;
}

// ─── Rate Limiting (session-based, 5 requests per hour per IP) ───────────────
session_start();
$ip           = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitKey = 'se_rl_' . md5($ip); // 'se_' prefix = Software Enquiry, isolated from careers

if (!isset($_SESSION[$rateLimitKey])) {
    $_SESSION[$rateLimitKey] = ['count' => 0, 'start' => time()];
}

// Reset window after 1 hour
if ((time() - $_SESSION[$rateLimitKey]['start']) > 3600) {
    $_SESSION[$rateLimitKey] = ['count' => 0, 'start' => time()];
}

$_SESSION[$rateLimitKey]['count']++;

if ($_SESSION[$rateLimitKey]['count'] > 50) {
    http_response_code(429);
    Logger::log("SoftwareEnquiry Rate limit exceeded for IP: $ip", "RATE_LIMIT");
    echo json_encode([
        "success" => false,
        "message" => "Too many requests. Please wait before submitting again."
    ]);
    exit;
}

// ─── Anti-spam: duplicate submission guard (10-second cooldown per IP) ───────
$cooldownKey = 'se_cd_' . md5($ip);
if (isset($_SESSION[$cooldownKey]) && (time() - $_SESSION[$cooldownKey]) < 10) {
    http_response_code(429);
    Logger::log("SoftwareEnquiry Cooldown triggered for IP: $ip", "SPAM_GUARD");
    echo json_encode([
        "success" => false,
        "message" => "Please wait a moment before submitting again."
    ]);
    exit;
}
$_SESSION[$cooldownKey] = time();

// ─── Parse incoming JSON or fall back to POST body ────────────────────────────
$rawInput = file_get_contents("php://input");
$data     = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    $data = $_POST;
}

Logger::log(
    "SoftwareEnquiry STEP 1: API HIT | IP: $ip | payload: " . json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    "INFO"
);

// ─── Execute ─────────────────────────────────────────────────────────────────
try {
    $db           = (new Database())->getConnection();
    $emailService = new EmailService($db);
    $controller   = new SoftwareEnquiryController($emailService);

    $result = $controller->handle($data);

    http_response_code($result['success'] ? 200 : 400);

    Logger::log(
        "SoftwareEnquiry STEP 5: RESPONSE | success=" . ($result['success'] ? 'true' : 'false')
        . " | msg=" . $result['message'],
        "INFO"
    );

    echo json_encode($result);

} catch (Throwable $e) {
    Logger::log("SoftwareEnquiry FATAL API Exception: " . $e->getMessage() . " | " . $e->getTraceAsString(), "FATAL");
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Internal server error. Please contact support."
    ]);
}
?>
