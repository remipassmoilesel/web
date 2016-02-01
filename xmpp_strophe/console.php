<?php ?>
<html>
    <html>
        <head>
            <meta http-equiv=”Content-type” content=”text/html;charset=UTF-8” />

            <title>Console</title>

            <link rel='stylesheet' href='jquery-ui/jquery-ui.css'>
            <script src='jquery-2.2.0.js'></script>
            <script src='jquery-ui/jquery-ui.js'></script>
            <script src='strophejs-1.2.4/strophe.js'></script>

            <script type='text/javascript' src="console.js"></script>

            <style type="text/css">
                body {
                    font-family: Helvetica;
                }
                h1 {
                    text-align: center;
                }
                #page_content{
                    width: 80%;
                    margin: auto;
                }
                #console {
                    padding: 10px;
                    height: 300px;
                    border: solid 1px #aaa;
                    background-color: #000;
                    color: #eee;
                    font-family: monospace;
                    overflow: auto;
                }
                #input {
                    width: 100%;
                    height: 100px;
                    font-family: monospace;
                }
                .incoming {
                    background-color: #111;
                }
                textarea.disabled {
                    background-color: #bbb;
                }
                #buttonbar {
                    margin: 10px;
                }
                #connection_button {
                    width: 100px;
                    float: right;
                }
                #send_button {
                    float: right;
                    width: 100px;
                }

                .xml_punc { color: #888; }
                .xml_tag { color: #e77; }
                .xml_aname { color: #55d; }
                .xml_avalue { color: #77f; }
                .xml_text { color: #aaa }
                .xml_level0 { padding-left: 0; }
                .xml_level1 { padding-left: 1em;}
                .xml_level2 { padding-left: 2em;}
                .xml_level3 { padding-left: 3em;}
                .xml_level4 { padding-left: 4em;}
                .xml_level5 { padding-left: 5em;}
                .xml_level6 { padding-left: 6em;}
                .xml_level7 { padding-left: 7em;}
                .xml_level8 { padding-left: 8em;}
                .xml_level9 { padding-left: 9em;}

            </style>

            <script>
            </script>

        </head>
        <body>

            <h1>Console</h1>
            <div id="page_content">

                <div id='login_bar'>
                    <label>JID:</label><input type='text' id='jid'>
                    <label>Password:</label><input type='password' id='password'>
                    <input id='deconnection_button' type='submit' value='Disconnect'
                           disabled='disabled' class='button'>
                    <input id='connection_button' type='submit' value='Connect'
                           class='button'>
                </div>

                <div id='console'></div>
                <textarea id='input' class='disabled' disabled='disabled'></textarea>

                <div id='buttonbar'>
                    <input id='send_button' type='submit' value='Send Data'
                           disabled='disabled' class='button'>

                </div>
            </div>
        </body>
    </html>
</html>
