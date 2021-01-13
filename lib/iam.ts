import * as cdk from '@aws-cdk/core';

import * as iam from '@aws-cdk/aws-iam';

export class IAM extends cdk.Construct {
  
  public readonly taskrole : iam.Role;

  
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    // The code that defines your stack goes here
    
    const ecscontainerrole = new iam.Role(this, 'taskrole', {
        roleName : "ets-sbx-iad-parcore",
        assumedBy: new iam.ServicePrincipal('ecs.amazonaws.com')
    });

    ecscontainerrole.addToPolicy(new iam.PolicyStatement({
        resources: ['*'],
        actions: [
            'ssm:GetParametersByPath',
            's3:ListBucket',
            's3:PutObjectAcl',
            'kms:Decrypt'
        ]
    }));
    
    this.taskrole = ecscontainerrole;
    
  }
}