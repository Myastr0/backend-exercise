import ShineError from '../../utils/shine-error.class';

export const E_TRANSACTION_ALREADY_EXISTS = ({
  transactionId,
}: {
  transactionId: string;
}) =>
  new ShineError(
    'E_TRANSACTION_ALREADY_EXISTS',
    'Transaction already exists in db',
    { transactionId },
  );

export const E_TRANSACTION_NOT_FOUND = ({
  transactionId,
}: {
  transactionId: string;
}) =>
  new ShineError('E_TRANSACTION_NOT_FOUND', 'Transaction not found in db', {
    transactionId,
  });

export const E_INVALID_TRANSACTION_STATUS = ({
  transactionId,
  status,
}: {
  transactionId: string;
  status: string;
}) =>
  new ShineError('E_INVALID_TRANSACTION_STATUS', 'Invalid transaction status', {
    transactionId,
    status,
  });

export const E_TRANSACTION_EXECUTED_AT_SHOULD_BE_DEFINED = ({
  transactionId,
}: {
  transactionId: string;
}) =>
  new ShineError(
    'E_TRANSACTION_EXECUTED_AT_SHOULD_BE_DEFINED',
    'Execution date should be defined',
    { transactionId },
  );

export const E_TRANSACTION_ALREADY_VALIDATED = ({
  transactionId,
}: {
  transactionId: string;
}) =>
  new ShineError(
    'E_TRANSACTION_ALREADY_VALIDATED',
    'Transaction is already in VALIDATED status',
    { transactionId },
  );
