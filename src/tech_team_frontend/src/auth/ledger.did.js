export const idlFactory = ({ IDL }) => {
  const AccountIdentifier = IDL.Vec(IDL.Nat8);
  const Duration = IDL.Record({ 'secs': IDL.Nat64, 'nanos': IDL.Nat32 });
  const ArchiveOptions = IDL.Record({
    'num_blocks_to_archive': IDL.Nat64,
    'trigger_threshold': IDL.Nat64,
    'max_message_size_bytes': IDL.Opt(IDL.Nat64),
    'cycles_for_archive_creation': IDL.Opt(IDL.Nat64),
    'node_max_memory_size_bytes': IDL.Opt(IDL.Nat64),
    'controller_id': IDL.Principal,
  });
  const ICPTs = IDL.Record({ 'e8s': IDL.Nat64 });
  const LedgerCanisterInitPayload = IDL.Record({
    'send_whitelist': IDL.Vec(IDL.Principal),
    'minting_account': AccountIdentifier,
    'transaction_window': IDL.Opt(Duration),
    'max_message_size_bytes': IDL.Opt(IDL.Nat64),
    'archive_options': IDL.Opt(ArchiveOptions),
    'initial_values': IDL.Vec(IDL.Tuple(AccountIdentifier, ICPTs)),
  });
  const AccountBalanceArgs = IDL.Record({ 'account': AccountIdentifier });
  const Memo = IDL.Nat64;
  const SubAccount = IDL.Vec(IDL.Nat8);
  const TimeStamp = IDL.Record({ 'timestamp_nanos': IDL.Nat64 });
  const SendArgs = IDL.Record({
    'to': AccountIdentifier,
    'fee': ICPTs,
    'memo': Memo,
    'from_subaccount': IDL.Opt(SubAccount),
    'created_at_time': IDL.Opt(TimeStamp),
    'amount': ICPTs,
  });
  const BlockIndex = IDL.Nat64;
  const NotifyCanisterArgs = IDL.Record({
    'to_subaccount': IDL.Opt(SubAccount),
    'from_subaccount': IDL.Opt(SubAccount),
    'to_canister': IDL.Principal,
    'max_fee': ICPTs,
    'block_height': BlockIndex,
  });
  const Tokens = IDL.Record({ 'e8s': IDL.Nat64 });
  const TransferArgs = IDL.Record({
    'to': AccountIdentifier,
    'fee': Tokens,
    'memo': Memo,
    'from_subaccount': IDL.Opt(SubAccount),
    'created_at_time': IDL.Opt(TimeStamp),
    'amount': Tokens,
  });
  const TransferError = IDL.Variant({
    'TxTooOld': IDL.Record({ 'allowed_window_nanos': IDL.Nat64 }),
    'BadFee': IDL.Record({ 'expected_fee': Tokens }),
    'TxDuplicate': IDL.Record({ 'duplicate_of': BlockIndex }),
    'TxCreatedInFuture': IDL.Null,
    'InsufficientFunds': IDL.Record({ 'balance': Tokens }),
  });
  const TransferResult = IDL.Variant({
    'Ok': BlockIndex,
    'Err': TransferError,
  });
  return IDL.Service({
    'account_balance': IDL.Func([AccountBalanceArgs], [ICPTs], ['query']),
    'notify_dfx': IDL.Func([NotifyCanisterArgs], [], []),
    'send_dfx': IDL.Func([SendArgs], [BlockIndex], []),
    'transfer': IDL.Func([TransferArgs], [TransferResult], []),
  });
};
export const init = ({ IDL }) => {
  const AccountIdentifier = IDL.Vec(IDL.Nat8);
  const Duration = IDL.Record({ 'secs': IDL.Nat64, 'nanos': IDL.Nat32 });
  const ArchiveOptions = IDL.Record({
    'num_blocks_to_archive': IDL.Nat64,
    'trigger_threshold': IDL.Nat64,
    'max_message_size_bytes': IDL.Opt(IDL.Nat64),
    'cycles_for_archive_creation': IDL.Opt(IDL.Nat64),
    'node_max_memory_size_bytes': IDL.Opt(IDL.Nat64),
    'controller_id': IDL.Principal,
  });
  const ICPTs = IDL.Record({ 'e8s': IDL.Nat64 });
  const LedgerCanisterInitPayload = IDL.Record({
    'send_whitelist': IDL.Vec(IDL.Principal),
    'minting_account': AccountIdentifier,
    'transaction_window': IDL.Opt(Duration),
    'max_message_size_bytes': IDL.Opt(IDL.Nat64),
    'archive_options': IDL.Opt(ArchiveOptions),
    'initial_values': IDL.Vec(IDL.Tuple(AccountIdentifier, ICPTs)),
  });
  return [LedgerCanisterInitPayload];
};
