pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        stage('Test') {
            steps {
                echo 'npm run test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the Application....'
            }
        }
    }
} 