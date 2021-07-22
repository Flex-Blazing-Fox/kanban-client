<template>
        <div>
            <!-- navbar -->
            <div>
                <nav class="navbar navbar-expand-lg navbar-light" style="background-color: coral;" id="navbar">
                    <a class="navbar-brand" style="color: whitesmoke;" href="#"><h3>Kanban</h3></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse navbar-nav" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#" id="nav-home">Home</a>
                            </li>
                            <li class="nav-item active">g
                            <a class="nav-link" href="#" id="nav-add">Add Task</a>
                            </li>
                        </ul>
                        <a class="nav-link active" href="#" id="nav-logout">Logout</a>
                    </div>
                </nav>
            </div>
            <!-- navbar -->


            <div class="container d-flex justify-content-center align-items-center" style="padding-top: 7%;">
                <div class="col-lg-6">
                    <div class="container d-flex justify-content-center align-items-center mt-4 mb-5 border-line"> <img src="./kanban.png" class="image"> </div>
                </div>
                <div class="col-lg-6">
                    <!-- login -->
                    <div id="login-form">
                        <div class="container d-flex flex-column justify-content-center align-items-center">
                            <form id="login-form" style="background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px 0px #bababa;">
                                <h3 style="text-align: center; padding-bottom: 20px;">Login</h3>
                                <div class="form-group">
                                    <input type="email" class="form-control" id="email-login" aria-describedby="emailHelp" placeholder="Enter Email" autocomplete="off">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" id="password-login" placeholder="Password">
                                </div>
                                <button type="submit" class="btn btn-primary btn-block" style="background-color: coral; color:whitesmoke;">Login</button>
                                <p style="margin-top: 1rem;">Register new account? <a id="go-to-register" style="text-decoration: none; cursor: pointer; color:coral">register here</a></p>
                                <p class="text-center">------- OR -------</p>
                                <div class="container d-flex flex-column justify-content-center align-items-center g-signin2" data-onsuccess="onSignIn"></div>
                            </form>
                        </div> 
                    </div>
                    <!-- login -->

                    <!-- register form -->
                    <div id="register-form">
                        <div class="container d-flex flex-column justify-content-center align-items-center">
                            <form id="register-form" style="background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px 0px #bababa;">
                                <h3 style="text-align: center; padding-bottom: 20px;">Register</h3>
                                <div class="form-group">
                                    <input type="email" class="form-control" id="email-register" aria-describedby="emailHelp" placeholder="Your Email" autocomplete="off">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" id="password-register" placeholder="Your Password">
                                </div>
                                <button type="submit" class="btn btn-primary btn-block" style="background-color: coral; color:whitesmoke;">Submit</button>
                                <p style="margin-top: 1rem;">Already have an account? <a id="go-to-login" style="text-decoration: none; cursor: pointer; color:coral">login here</a></p>
                            </form>
                        </div>
                    </div>
                    <!-- register form -->

                </div>
            </div>
        
        
            <!-- board -->
            <div class="columns">
                <div class="column is-3">
                    <div class="card">
                        <header class="card-header has-background-warning">
                            <h4 class="card-header-title has-text-white">
                                Materi
                            </h4>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                Jquery & Ajax
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="#" class="card-footer-item">Edit</a>
                            <a href="#" class="card-footer-item">Delete</a>
                            <div class="card-footer-item select is-primary">
                                <select>
                                    <option value="">Watch Video Recording</option>
                                    <option value="">Practice</option>
                                    <option value="">Done</option>
                                </select>
                            </div>
                        </footer>
                        <div class="is-devider"></div>
                        <div class="card-content">
                            <div class="content">
                                firebase
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="#" class="card-footer-item">Edit</a>
                            <a href="#" class="card-footer-item">Delete</a>
                            <div class="card-footer-item select is-primary">
                                <select>
                                    <option value="">Watch Video Recording</option>
                                    <option value="">Practice</option>
                                    <option value="">Done</option>
                                </select>
                            </div>
                        </footer>
                        <div class="is-devider"></div>
                        <div class="card-content">
                            <div class="content">
                                OAuth
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="#" class="card-footer-item">Edit</a>
                            <a href="#" class="card-footer-item">Delete</a>
                            <div class="card-footer-item select is-primary">
                                <select>
                                    <option value="">Watch Video Recording</option>
                                    <option value="">Practice</option>
                                    <option value="">Done</option>
                                </select>
                            </div>
                        </footer>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="card">
                        <header class="card-header has-background-info-dark">
                            <h4 class="card-header-title has-text-white">
                                Watch Video Recording
                            </h4>
                        </header>
                    </div>            
                </div>
                <div class="column is-3">
                    <div class="card">
                        <header class="card-header has-background-success">
                            <h4 class="card-header-title has-text-white">
                                Practice
                            </h4>
                        </header>                
                    </div>            
                </div>
                <div class="column is-3">
                    <div class="card">
                        <header class="card-header has-background-danger">
                            <h4 class="card-header-title has-text-white">
                                Done
                            </h4>
                        </header>
                    </div>            
                </div>
                <!-- board -->
            
                <!-- footer -->
                <div class="foter">
                    <p>copyright &copy; 2021 by Nugraha Kiat Saputra</p>
                </div>
                <!-- footer -->
            </div>
        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>