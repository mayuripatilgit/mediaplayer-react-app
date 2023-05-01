pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    parameters {
        choice(name:'VERSION', choices:['1.0', '1.1', '1.2'], description:'Choose the version of the project')

        booleanParam(name :'executeTests', description:'Execute the tests', defaultValue:false)
    }

    stages {
        stage('Build') {
            steps {
                bat 'npm install --force'
                bat 'npm run build'
            }
        }
        stage('Test') {
            steps {
                // bat 'npm run test'
                echo "Test"

            }
        }
        stage('Build Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-auth', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    bat 'docker build -t mediaplayer-react-app .'
                    bat "echo $PASS | docker login -u $USER --password-stdin"
                    bat 'docker push mediaplayer-react-app'
                }
            }
        }
        stage ('Deploy') {
            steps {
                script {
                    def dockerCmd = 'docker run  -p 3000:3000 -d mediaplayer-react-app:latest'
                    sshagent(['ec2-server-key']) {
                        bat "ssh -o StrictHostKeyChecking=no ec2-user@3.92.144.96 ${dockerCmd}"
                    }
                }
            }
        }
    }
}
