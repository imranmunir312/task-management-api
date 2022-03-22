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