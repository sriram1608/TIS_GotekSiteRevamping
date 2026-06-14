<?php
require_once __DIR__ . '/../utils/Logger.php';

class ContactController
{
    private $emailService;

    public function __construct($emailService)
    {
        $this->emailService = $emailService;
    }

    public function handle(array $data): array
    {
        try {
            // Validate timezone is set to IST
            date_default_timezone_set('Asia/Kolkata');

            // Sanitize & Validate
            $fullName = trim(strip_tags($data['fullName'] ?? ''));
            $phone    = trim(strip_tags($data['phone']    ?? ''));
            $email    = trim(strip_tags($data['email']    ?? ''));
            $message  = trim(strip_tags($data['message']  ?? ''));

            // Required fields check
            if ($fullName === '' || $email === '' || $message === '') {
                Logger::log("Contact Validation FAIL: missing required fields.", "VALIDATION");
                return $this->fail("Full Name, Email, and Message are required.");
            }

            // Email format check
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                Logger::log("Contact Validation FAIL: invalid email '$email'", "VALIDATION");
                return $this->fail("Invalid email address.");
            }

            Logger::log("Contact STEP 2: VALIDATION PASSED | email='$email'", "INFO");

            // Generate timestamp dynamically during submission
            $timestamp = date('d M Y, h:i A');

            // Send emails independently
            $payload = [
                'fullName'  => $fullName,
                'phone'     => $phone,
                'email'     => $email,
                'message'   => $message,
                'timestamp' => $timestamp,
            ];

            // Send admin notification email (Step 2 in workflow)
            try {
                $adminEmailSent = $this->emailService->sendContactAdminEmail($payload);
                Logger::log(
                    $adminEmailSent
                        ? "Contact STEP 3: ADMIN EMAIL SENT"
                        : "Contact STEP 3: ADMIN EMAIL FAILED",
                    $adminEmailSent ? "INFO" : "ERROR"
                );
            } catch (Throwable $e) {
                Logger::log("Contact STEP 3: ADMIN EMAIL EXCEPTION | " . $e->getMessage(), "ERROR");
            }

            // Send user confirmation email (Step 3 in workflow)
            try {
                $userEmailSent = $this->emailService->sendContactUserEmail($payload);
                Logger::log(
                    $userEmailSent
                        ? "Contact STEP 4: USER EMAIL SENT to '$email'"
                        : "Contact STEP 4: USER EMAIL FAILED",
                    $userEmailSent ? "INFO" : "ERROR"
                );
            } catch (Throwable $e) {
                Logger::log("Contact STEP 4: USER EMAIL EXCEPTION | " . $e->getMessage(), "ERROR");
            }

            // Return JSON response (Step 4)
            return [
                "success" => true,
                "message" => "Inquiry submitted successfully. Confirmation email sent.",
            ];

        } catch (Throwable $e) {
            Logger::log("ContactController::handle EXCEPTION | " . $e->getMessage(), "FATAL");
            return $this->fail("An unexpected server error occurred. Please try again.");
        }
    }

    private function fail(string $message): array
    {
        return [
            "success" => false,
            "message" => $message,
        ];
    }
}
?>
