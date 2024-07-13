@Library('Shared') _
pipeline {
    agent any
    
    environment{
        SONAR_HOME = tool "Sonar"
    }
    stages {
        
        stage("Workspace cleanup"){
            steps{
                script{
                    cleanWs()
                }
            }
        }
        
        stage('Git: Code Checkout') {
            steps {
                script{
                    code_checkout("https://github.com/dixitpiyush/footprints.git","devops")
                }
            }
        }
        
        stage("OWASP: Dependency check"){
            steps{
                script{
                    owasp_dependency()
                }
            }
            post{
                success{
                    archiveArtifacts artifacts: '**/dependency-check-report.xml', followSymlinks: false, onlyIfSuccessful: true
                }
            }
        }
        
        stage("Trivy: Filesystem scan"){
            steps{
                script{
                    trivy_scan()
                }
            }
        }
        
        stage("SonarQube: Code Analysis"){
            steps{
                script{
                    sonarqube_analysis("Sonar","footprints","footprints")
                }
            }
        }
        
        stage("SonarQube: Code Quality Gates"){
            steps{
                script{
                    sonarqube_code_quality()
                }
            }
        }
        
        stage('Exporting environment variables') {
            parallel{
                stage("Backend env setup"){
                    steps {
                        script{
                            dir("Automations"){
                                sh "bash updateBackend.sh"
                            }
                        }
                    }
                }
                
                stage("Frontend env setup"){
                    steps {
                        script{
                            dir("Automations"){
                                sh "bash updateFrontend.sh"
                            }
                        }
                    }
                }
            }
        }
        
        stage("Docker: Build Images"){
            steps{
                script{
                    dir('backend'){
                        docker_build("backend-footprints","test-image-donot-use","madhupdevops")
                    }
                    
                    dir('frontend'){
                        docker_build("frontend-footprints","test-image-donot-use","madhupdevops")
                    }
                }
            }
        }
        
        stage("Docker: Push to DockerHub"){
            steps{
                script{
                    docker_push("backend-footprints","test-image-donot-use","madhupdevops") 
                    docker_push("frontend-footprints","test-image-donot-use","madhupdevops")
                }
            }
        }
    }
    
    post{
        success{
            build job: "footprints-CD", parameters: [
                string(name: 'FRONTEND_DOCKER_TAG', value: "test-image-donot-use"),
                string(name: 'BACKEND_DOCKER_TAG', value: "test-image-donot-use")
            ]
        }
    }
}
