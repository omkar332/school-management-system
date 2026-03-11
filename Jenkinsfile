pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/omkar332/school-management-system.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy to Nginx') {
            steps {
                bat 'xcopy /E /Y /I build\\* C:\\nginx\\html\\'
            }
        }
    }
}