<?php
require_once __DIR__ . '/../utils/Logger.php';

class SoftwareEnquiryController
{
    private $emailService;

    // Allowed software names (must match dropdown values in ITSolutions.tsx exactly)
    private static $ALLOWED_SOFTWARES = [
        'ID Card and Lanyard Cropping Tool',
        'SAC - Smart AI Campus',
        'E-Commerce',
    ];

    // Allowed meeting time slots (must match dropdown values in ITSolutions.tsx exactly)
    private static $ALLOWED_TIMES = [
        '09:00 AM - 12:00 PM',
        '12:00 PM - 03:00 PM',
        '03:00 PM - 06:00 PM',
    ];

    public function __construct($emailService)
    {
        $this->emailService = $emailService;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Main handler
    // ─────────────────────────────────────────────────────────────────────────
    public function handle(array $data): array
    {
        try {
            // ── STEP 2: Sanitize & Validate ───────────────────────────────────

            $name     = trim(strip_tags($data['name']     ?? ''));
            $mobile   = trim(strip_tags($data['mobile']   ?? ''));
            $email    = trim(strip_tags($data['email']    ?? ''));
            $software = trim(strip_tags($data['software'] ?? ''));
            $time     = trim(strip_tags($data['time']     ?? ''));

            // Required fields check
            if ($name === '' || $mobile === '' || $email === '' || $software === '' || $time === '') {
                Logger::log("SoftwareEnquiry Validation FAIL: missing required fields. name='$name' mobile='$mobile' email='$email' software='$software' time='$time'", "VALIDATION");
                return $this->fail("All fields are required.");
            }

            // Name length check
            if (strlen($name) > 150) {
                Logger::log("SoftwareEnquiry Validation FAIL: name too long", "VALIDATION");
                return $this->fail("Name is too long.");
            }

            // Email format check
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                Logger::log("SoftwareEnquiry Validation FAIL: invalid email '$email'", "VALIDATION");
                return $this->fail("Invalid email address.");
            }

            // Mobile basic format check (7–15 digits, optional leading + or spaces/dashes)
            if (!preg_match('/^\+?[\d\s\-]{7,20}$/', $mobile)) {
                Logger::log("SoftwareEnquiry Validation FAIL: invalid mobile '$mobile'", "VALIDATION");
                return $this->fail("Invalid mobile number.");
            }

            // Software whitelist check
            if (!in_array($software, self::$ALLOWED_SOFTWARES, true)) {
                Logger::log("SoftwareEnquiry Validation FAIL: invalid software '$software'", "VALIDATION");
                return $this->fail("Invalid software selection.");
            }

            // Meeting time whitelist check
            if (!in_array($time, self::$ALLOWED_TIMES, true)) {
                Logger::log("SoftwareEnquiry Validation FAIL: invalid meeting time '$time'", "VALIDATION");
                return $this->fail("Invalid meeting time selection.");
            }

            Logger::log("SoftwareEnquiry STEP 2: VALIDATION PASSED | email='$email' software='$software'", "INFO");

            // ── STEP 3: Generate timestamp ────────────────────────────────────
            $timestamp = date('d M Y, h:i A');

            // ── STEP 4: Send emails independently ────────────────────────────
            $payload = [
                'name'      => $name,
                'mobile'    => $mobile,
                'email'     => $email,
                'software'  => $software,
                'time'      => $time,
                'timestamp' => $timestamp,
            ];

            $userEmailSent  = false;
            $adminEmailSent = false;

            // Send user confirmation email (Step 3 in workflow)
            try {
                $userEmailSent = $this->emailService->sendSoftwareEnquiryUserEmail($payload);
                Logger::log(
                    $userEmailSent
                        ? "SoftwareEnquiry STEP 3: USER EMAIL SENT to '$email'"
                        : "SoftwareEnquiry STEP 3: USER EMAIL FAILED (returned false)",
                    $userEmailSent ? "INFO" : "ERROR"
                );
            } catch (Throwable $e) {
                Logger::log("SoftwareEnquiry STEP 3: USER EMAIL EXCEPTION | " . $e->getMessage(), "ERROR");
            }

            // Send admin notification email (Step 4 in workflow)
            try {
                $adminEmailSent = $this->emailService->sendSoftwareEnquiryAdminEmail($payload);
                Logger::log(
                    $adminEmailSent
                        ? "SoftwareEnquiry STEP 4: ADMIN EMAIL SENT"
                        : "SoftwareEnquiry STEP 4: ADMIN EMAIL FAILED (returned false)",
                    $adminEmailSent ? "INFO" : "ERROR"
                );
            } catch (Throwable $e) {
                Logger::log("SoftwareEnquiry STEP 4: ADMIN EMAIL EXCEPTION | " . $e->getMessage(), "ERROR");
            }

            // ── STEP 5: Return JSON response ──────────────────────────────────
            return [
                "success" => true,
                "message" => "Software enquiry submitted successfully. Confirmation email sent.",
            ];

        } catch (Throwable $e) {
            Logger::log("SoftwareEnquiryController::handle EXCEPTION | " . $e->getMessage() . " | " . $e->getTraceAsString(), "FATAL");
            return $this->fail("An unexpected server error occurred. Please try again.");
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Helper: standard failure response
    // ─────────────────────────────────────────────────────────────────────────
    private function fail(string $message): array
    {
        return [
            "success" => false,
            "message" => $message,
        ];
    }
}
?>
