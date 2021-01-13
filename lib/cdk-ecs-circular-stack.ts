import * as cdk from '@aws-cdk/core';

import * as ecs from '@aws-cdk/aws-ecs';
import * as ecr from '@aws-cdk/aws-ecr';

import {IAM} from './iam'

export class CdkEcsCircularStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    
    const iam = new IAM(this, 'roles');
    
    const td = new ecs.FargateTaskDefinition(this, 'taskdefinition',{
            cpu : 2048,
            family : 'alert-service',
            memoryLimitMiB : 2048,
            executionRole : iam.taskrole, 
            taskRole : iam.taskrole,          
        });

    // Attach container definition to task definition
    const reponame = new ecr.Repository(this, 'ecr', {
        repositoryName : 'ets-sbx-parcore'
    });
    
    const cd = new ecs.ContainerDefinition(this, 'containerdefinition', {
            taskDefinition : td,
            image : ecs.ContainerImage.fromEcrRepository(reponame),
            //image: ecs.ContainerImage.fromRegistry('nginx'),
        });
    
  }
};

