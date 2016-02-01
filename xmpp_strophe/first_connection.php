<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>

<html>
    <head>
        <title></title>
        <link href="jquery-ui/jquery-ui.css" rel="stylesheet" />
        <script type="text/javascript" src="jquery-2.2.0.js"></script>
        <script type="text/javascript" src="jquery-ui/jquery-ui.js"></script>
        <script type="text/javascript" src="strophejs-1.2.4/strophe.js"></script>

        <script type="text/javascript" src="first_connection.js"></script>

        <style type="text/css">

            .hidden{
                display: none;
            }

        </style>



    </head>

    <body>

        <div id="login_bar" class="hidden">
            <label>JID:</label><input type="text" id="jid" />
            <label>Password:</label><input type="password" id="password" />
        </div>

        <div id="log">

        </div>

    </body>
</html>

