pipeline {
    agent any
    environment {
        HOST = credentials('HOST')
    }
    stages {
        stage('Build') {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        stage('Test') {
            steps {
                echo "HOST: $HOST"
                sh 'npm run test --passWithNoTests'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'aws', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]){
                        sh "echo $PASSWORD | docker login --username $USERNAME --password-stdin $HOST"
                        sh "docker build -t task-management-api ."
                        sh "docker tag task-management-api:latest 620709914666.dkr.ecr.us-east-1.amazonaws.com/task-management-api:latest"
                        sh "docker push 620709914666.dkr.ecr.us-east-1.amazonaws.com/task-management-api:latest"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the Application....'
            }
        }
    }
} 