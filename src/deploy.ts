import * as core from '@actions/core';
import * as AWS from 'aws-sdk';

(async () => {
  const fnName = core.getInput('aws-lambda-function-name');
  const containerImageURI = core.getInput('container-image-uri');

  core.info(
    `Uploading function ${fnName} from ECR image URI: ${containerImageURI}..`,
  );

  try {
    const lambda = new AWS.Lambda();
    await lambda
      .updateFunctionCode({
        FunctionName: fnName,
        ImageUri: containerImageURI,
      })
      .promise();
    core.info('Successfully uploaded');
  } catch (e) {
    core.setFailed(e as any);
  }
})();
