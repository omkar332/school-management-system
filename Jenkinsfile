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
                bat 'if exist C:\\nginx-1.26.3\\nginx-1.26.3\\html\\index.html del /F /Q C:\\nginx-1.26.3\\nginx-1.26.3\\html\\index.html'
                bat 'if exist C:\\nginx-1.26.3\\nginx-1.26.3\\html\\50x.html del /F /Q C:\\nginx-1.26.3\\nginx-1.26.3\\html\\50x.html'
                bat 'if exist C:\\nginx-1.26.3\\nginx-1.26.3\\html\\assets rmdir /S /Q C:\\nginx-1.26.3\\nginx-1.26.3\\html\\assets'
                bat 'xcopy /E /Y /I build\\* C:\\nginx-1.26.3\\nginx-1.26.3\\html\\'
            }
        }
    }
}