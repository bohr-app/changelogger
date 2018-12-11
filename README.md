# Change logger

CLI tool to facilitate creating, updating and maintaining CHANGELOG files

## Configuration

In `package.json`, add the following:

- `deployer`
  - `projectId` - `string` - GCP project of the storage to be used.
  - `keyFilename` - `string` - path to the json file with the private key for authentication, relative to package.json.
  - `bucketName` - `string` - name of the bucket to be used.
  - `bucketFolder` - `string` - path to be preappended to object being uploaded.
  - `targets` - `Array<string>` - array with the platforms' folders names with the files to be uploaded
