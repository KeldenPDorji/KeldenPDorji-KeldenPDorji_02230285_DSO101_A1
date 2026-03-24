pipeline {
    agent any
    
    stages {
        // Stage 1: Checkout Code
        stage('Checkout') {
            steps {
                echo '=== Checking out code from GitHub ==='
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/KeldenPDorji/KeldenPDorji_02230285_DSO101_A1.git']]
                ])
            }
        }
        
        // Stage 2: Install Dependencies
        stage('Install Backend Dependencies') {
            steps {
                echo '=== Installing backend dependencies ==='
                dir('todo-app/backend') {
                    sh '/Users/keldendrac/.nvm/versions/node/v24.11.1/bin/npm install'
                    sh '/Users/keldendrac/.nvm/versions/node/v24.11.1/bin/npm install --save-dev jest jest-junit'
                }
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                echo '=== Installing frontend dependencies ==='
                dir('todo-app/frontend') {
                    sh '/Users/keldendrac/.nvm/versions/node/v24.11.1/bin/npm install'
                }
            }
        }
        
        // Stage 3: Build Frontend
        stage('Build Frontend') {
            steps {
                echo '=== Building React frontend ==='
                dir('todo-app/frontend') {
                    sh '/Users/keldendrac/.nvm/versions/node/v24.11.1/bin/npm run build'
                }
            }
        }
        
        // Stage 4: Run Backend Tests
        stage('Test Backend') {
            steps {
                echo '=== Running backend tests ==='
                dir('todo-app/backend') {
                    sh '''
                        cat > jest.config.js << 'EOF'
const config = {
  testEnvironment: 'node',
  collectCoverageFrom: ['server.js'],
  reporters: ['default', 'jest-junit']
};
module.exports = config;
EOF
                    '''
                    sh '/Users/keldendrac/.nvm/versions/node/v24.11.1/bin/npm test -- --ci --reporters=default --reporters=jest-junit'
                }
            }
            post {
                always {
                    junit 'todo-app/backend/junit.xml'
                }
            }
        }
        
        // Stage 5: Run Frontend Tests
        stage('Test Frontend') {
            steps {
                echo '=== Running frontend tests ==='
                dir('todo-app/frontend') {
                    sh 'CI=true /Users/keldendrac/.nvm/versions/node/v24.11.1/bin/npm test -- --reporters=default --reporters=jest-junit 2>&1 || true'
                }
            }
            post {
                always {
                    junit 'todo-app/frontend/junit.xml'
                }
            }
        }
        
        // Stage 6: Build Docker Images
        stage('Build Docker Images') {
            steps {
                echo '=== Building Docker images ==='
                script {
                    sh 'docker build -t todo-backend:latest ./todo-app/backend'
                    sh 'docker build -t todo-frontend:latest ./todo-app/frontend'
                }
            }
        }
        
        // Stage 7: Push to Docker Hub
        stage('Push to Docker Hub') {
            steps {
                echo '=== Pushing images to Docker Hub (optional) ==='
                echo 'Configure Docker Hub credentials in Jenkins to enable pushing'
                echo 'Credentials ID needed: docker-hub-username and docker-hub-password'
            }
        }
        
        // Stage 8: Deploy (Optional - Direct Server Deployment)
        stage('Deploy') {
            steps {
                echo '=== Deployment stage ==='
                echo 'Configure with your deployment script'
                // Add your deployment logic here
                // Example: Deploy to Render, AWS, or direct server
            }
        }
    }
    
    post {
        always {
            echo '=== Pipeline Execution Complete ==='
        }
        success {
            echo '✓ Pipeline executed successfully!'
        }
        failure {
            echo '✗ Pipeline execution failed. Check logs above.'
        }
    }
}
