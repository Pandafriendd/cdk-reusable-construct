#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkEcsCircularStack } from '../lib/cdk-ecs-circular-stack';

const app = new cdk.App();
new CdkEcsCircularStack(app, 'CdkEcsCircularStack');
