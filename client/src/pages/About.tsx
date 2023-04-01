import React from 'react'



function About() {
    return (
        <div>
            <div>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <link href="css/bootstrap.css" rel="stylesheet" />
                <link href="css/pe-icon-7-stroke.css" rel="stylesheet" />
                {/*     <link href='css/ct-navbar.css' rel='stylesheet' /> */}
                <link href="css/rotating-card.css" rel="stylesheet" />
                <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
                <style dangerouslySetInnerHTML={{ __html: "\n        }\n        .navbar-default .navbar-nav > li > a{\n            padding: 15px 15px;\n            margin: 5px 0;\n        }\n\n        .navbar-default{\n            padding: 10px 0;\n            background-color: rgba(255, 255, 255, 0.95);\n            border-color: transparent;\n            box-shadow: 0 0px 13px rgba(0,0,0,.2);\n        }\n        .btn-info,\n        .btn-info:hover,\n        .btn-info:focus{\n            color: #FFF !important;\n            background-color: #00bbff !important;\n            border-color: #00bbff !important;\n        }\n\n        .btn-info{\n            opacity: .8;\n            transition: all 0.1s;\n            -webkit-transition: all 0.1s;\n        }\n        .btn-info:hover,\n        .btn-info:focus{\n            opacity: 1;\n        }\n    " }} />
                <div className="container">

                    <div className="row">
                        <h1 className="title">
                            This is our awesome team
                            <br />
                            <small>Presenting my team in crazy way</small>
                        </h1>
                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="col-md-4 col-sm-6">
                                <div className="card-container">
                                    <div className="card">
                                        <div className="front">
                                            <div className="cover">
                                                <img src="images/rotating_card_thumb.png" />
                                            </div>
                                            <div className="user">
                                                <img className="img-circle" src="images/profile_dhruv.jpg" />
                                            </div>
                                            <div className="content">
                                                <div className="main">
                                                    <h3 className="name">Dhruv Patel</h3>
                                                    {/* <p className="profession">Developer</p> */}
                                                    <p className="text-center">"I love to work with Design, I have created About us and Admin add menu item page."</p>
                                                </div>

                                            </div>
                                        </div> {/* end front panel */}
                                        <div className="back">
                                            <div className="header">
                                                <h5 className="motto">"Learning Always"</h5>
                                            </div>
                                            <div className="content">
                                                <div className="main">
                                                    <h4 className="text-center">Job Description</h4>
                                                    <p className="text-center">Java Front-end Developer</p>

                                                </div>
                                            </div>
                                        </div> {/* end back panel */}
                                    </div>
                                </div>

                            </div>
                            



                            <div className="col-md-4 col-sm-6">
                                <div className="card-container">
                                    <div className="card">
                                        <div className="front">
                                            <div className="cover">
                                                <img src="images/rotating_card_thumb2.png" />
                                            </div>
                                            <div className="user">
                                                <img className="img-circle" src="images/rotating_card_profile.png" />
                                            </div>
                                            <div className="content">
                                                <div className="main">
                                                    <h3 className="name">Akshay Gaikwad</h3>
                                                    <p className="text-center">"I'm the new Sinatra, and since I made it here I can make it anywhere, yeah, they love me everywhere"</p>
                                                </div>

                                            </div>
                                        </div> {/* end front panel */}
                                        <div className="back">
                                            <div className="header">
                                                <h5 className="motto">"Learning Always"</h5>
                                            </div>
                                            <div className="content">
                                                <div className="main">
                                                    <h4 className="text-center">Job Description</h4>
                                                    <p className="text-center">Java Front-end Developer</p>

                                                </div>
                                            </div>
                                        </div> {/* end back panel */}
                                    </div> {/* end card */}
                                </div> {/* end card-container */}
                            </div> {/* end col-sm-3 */}
                            <div className="col-md-4 col-sm-6">
                                <div className="card-container">
                                    <div className="card">
                                        <div className="front">
                                            <div className="cover">
                                                <img src="images/rotating_card_thumb.png" />
                                            </div>
                                            <div className="user">
                                                <img className="img-circle" src="images/profile_eknoor.jpg" />
                                            </div>
                                            <div className="content">
                                                <div className="main">
                                                    <h3 className="name">Eknoor Kaur</h3>
                                                    
                                                    <p className="text-center">"I'm the new Sinatra, and since I made it here I can make it anywhere, yeah, they love me everywhere"</p>
                                                </div>

                                            </div>
                                        </div> {/* end front panel */}
                                        <div className="back">
                                            <div className="header">
                                                <h5 className="motto">"Learning Always"</h5>
                                            </div>
                                            <div className="content">
                                                <div className="main">
                                                    <h4 className="text-center">Job Description</h4>
                                                    <p className="text-center">Java Front-end Developer</p>

                                                </div>
                                            </div>
                                        </div> {/* end back panel */}
                                    </div> {/* end card */}
                                </div> {/* end card-container */}
                            </div> {/* end col-sm-3 */}
                            <div className="col-md-4 col-sm-6">
                                <div className="card-container">
                                    <div className="card">
                                        <div className="front">
                                            <div className="cover">
                                                <img src="images/rotating_card_thumb2.png" />
                                            </div>
                                            <div className="user">
                                                <img className="img-circle" src="images/rotating_card_profile.png" />
                                            </div>
                                            <div className="content">
                                                <div className="main">
                                                    <h3 className="name">Patricia Siuha Liu</h3>
                                                    
                                                    <p className="text-center">"I'm the new Sinatra, and since I made it here I can make it anywhere, yeah, they love me everywhere"</p>
                                                </div>

                                            </div>
                                        </div> {/* end front panel */}
                                        <div className="back">
                                            <div className="header">
                                                <h5 className="motto">"Learning Always"</h5>
                                            </div>
                                            <div className="content">
                                                <div className="main">
                                                    <h4 className="text-center">Job Description</h4>
                                                    <p className="text-center">Java Front-end Developer</p>

                                                </div>
                                            </div>
                                        </div> {/* end back panel */}
                                    </div> {/* end card */}
                                </div> {/* end card-container */}
                            </div> {/* end col-sm-3 */}
                            <div className="col-md-4 col-sm-6">
                                <div className="card-container">
                                    <div className="card">
                                        <div className="front">
                                            <div className="cover">
                                                <img src="images/rotating_card_thumb.png" />
                                            </div>
                                            <div className="user">
                                                <img className="img-circle" src="images/rotating_card_profile.png" />
                                            </div>
                                            <div className="content">
                                                <div className="main">
                                                    <h3 className="name">Stavan Adhyaru</h3>
                                                    
                                                    <p className="text-center">"I'm the new Sinatra, and since I made it here I can make it anywhere, yeah, they love me everywhere"</p>
                                                </div>

                                            </div>
                                        </div> {/* end front panel */}
                                        <div className="back">
                                            <div className="header">
                                                <h5 className="motto">"Learning Always"</h5>
                                            </div>
                                            <div className="content">
                                                <div className="main">
                                                    <h4 className="text-center">Job Description</h4>
                                                    <p className="text-center">Java Front-end Developer</p>

                                                </div>
                                            </div>
                                        </div> {/* end back panel */}
                                    </div> {/* end card */}
                                </div> {/* end card-container */}
                            </div> {/* end col-sm-3 */}
                            {/*         <div class="col-sm-1"></div> */}
                            <div className="col-md-4 col-sm-6">
                                <div className="card-container">
                                    <div className="card">
                                        <div className="front">
                                            <div className="cover">
                                                <img src="images/rotating_card_thumb2.png" />
                                            </div>
                                            <div className="user">
                                                <img className="img-circle" src="images/rotating_card_profile.png" />
                                            </div>
                                            <div className="content">
                                                <div className="main">
                                                    <h3 className="name">Berk Karaimer</h3>
                                                    
                                                    <p className="text-center">"I'm the new Sinatra, and since I made it here I can make it anywhere, yeah, they love me everywhere"</p>
                                                </div>

                                            </div>
                                        </div> {/* end front panel */}
                                        <div className="back">
                                            <div className="header">
                                                <h5 className="motto">"Learning Always"</h5>
                                            </div>
                                            <div className="content">
                                                <div className="main">
                                                    <h4 className="text-center">Job Description</h4>
                                                    <p className="text-center">Java Front-end Developer</p>

                                                </div>
                                            </div>
                                        </div> {/* end back panel */}
                                    </div> {/* end card */}
                                </div> {/* end card-container */}
                            </div> {/* end col-sm-3 */}
                        </div> {/* end col-sm-10 */}
                    </div> {/* end row */}
                    <div className="space-200" />
                </div>
            </div>
        </div>
    )
}

export default About