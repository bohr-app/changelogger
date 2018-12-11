# Change logger

CLI tool to facilitate creating, updating and maintaining CHANGELOG files

## Configuration

In `package.json`, add the following:

- `deployer`
  - `baseOut` - `string` - base path to the platform-specific subfolders, relative to package.json.
  - `projectId` - `string` - GCP project of the storage to be used.
  - `keyFilename` - `string` - path to the json file with the private key for authentication, relative to package.json.
  - `bucketName` - `string` - name of the bucket to be used.
  - `bucketFolder` - `string` - path to be preappended to object being uploaded.
  
