pipeline {
    agent any
    environment {
        DISPLAY_NAME = credentials('HOST')
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
                echo "credentials ${DISPLAY_NAME}"
                sh 'npm run test --passWithNoTests'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'aws', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]){
                        sh "echo $PASSWORD | docker login --username $USERNAME --password-stdin"

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