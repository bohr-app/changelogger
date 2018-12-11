export function noLogsProvided(): void {
  try {
    throw new Error();
  } catch (err) {
    console.error('ERROR: you must provide at least one update with a meaningful update message');
  }

}
