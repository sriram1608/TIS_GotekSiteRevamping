<?php
// Set correct timezone explicitly
date_default_timezone_set('Asia/Kolkata');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-CSRF-Token");

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ─── Bootstrap ───────────────────────────────────────────────────────────────
$baseDir = __DIR__ . '/../../';
require_once $baseDir . 'config/Database.php';
require_once $baseDir . 'utils/Logger.php';
require_once $baseDir . 'services/EmailService.php';
require_once $baseDir . 'controllers/ContactController.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);
    exit;
}

// Parse incoming JSON or fall back to POST body
$rawInput = file_get_contents("php://input");
$data     = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    $data = $_POST;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

Logger::log(
    "Contact API HIT | IP: $ip | payload: " . json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    "INFO"
);

// ─── Execute ─────────────────────────────────────────────────────────────────
try {
    $db           = (new Database())->getConnection();
    $emailService = new EmailService($db);
    $controller   = new ContactController($emailService);

    $result = $controller->handle($data);

    http_response_code($result['success'] ? 200 : 400);

    echo json_encode($result);

} catch (Throwable $e) {
    Logger::log("Contact API FATAL Exception: " . $e->getMessage(), "FATAL");
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Internal server error. Please contact support."
    ]);
}
?>
