export function missingUpdateType(): void {
  console.error('FATAL ERROR: You must specify the update type by passing either: --p (patch), for patch; --f (feature), for minor; -m (major), for major\n');
}
