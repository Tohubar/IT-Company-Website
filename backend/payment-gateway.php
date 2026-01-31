<?php
/**
 * Payment gateway integration scaffold for Velvet Noir Boutique.
 * Replace placeholder logic with production SDK calls and environment secrets.
 */

declare(strict_types=1);

header('Content-Type: application/json');

$payload = json_decode(file_get_contents('php://input'), true) ?? [];
$action = $payload['action'] ?? 'health';

function respond(array $data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

if ($action === 'health') {
    respond([
        'status' => 'ok',
        'message' => 'Payment gateway scaffold ready.'
    ]);
}

if ($action === 'create_payment_intent') {
    $amount = (float) ($payload['amount'] ?? 0);
    $currency = $payload['currency'] ?? 'USD';
    $method = $payload['method'] ?? 'card';

    // TODO: Integrate PayPal, Bkash, Nagad, or card processor SDKs here.
    // Example: create payment intent / checkout session and return client secret.
    respond([
        'status' => 'pending',
        'amount' => $amount,
        'currency' => $currency,
        'method' => $method,
        'message' => 'Use provider SDK to create a payment intent and return a client token.'
    ]);
}

if ($action === 'verify_payment') {
    $transactionId = $payload['transaction_id'] ?? '';

    // TODO: Verify payment with provider API and update order status.
    respond([
        'status' => 'verified',
        'transaction_id' => $transactionId,
        'message' => 'Replace with provider verification logic.'
    ]);
}

respond([
    'status' => 'error',
    'message' => 'Unsupported action.'
], 400);
