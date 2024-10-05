pipeline {
    agent any

    environment {
        NODE_HOME = tool 'NodeJS'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/OCRServiceCMC/frontend_ocr'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                bat '''
                docker build -t frontend_ocr_pipeline .
                docker stop frontend_ocr_pipeline_container || true
                docker rm frontend_ocr_pipeline_container || true
                docker run -d -p 5173:5173 --name frontend_ocr_pipeline_container frontend_ocr_pipeline
                '''
            }
        }
    }
    post {
        always {
            echo 'Cleaning up workspace...'
            deleteDir()
        }
    }
}
