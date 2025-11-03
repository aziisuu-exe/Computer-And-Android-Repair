<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - AZIISUU.EXE</title>
    <link rel="stylesheet" href="css/login-style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&family=Roboto:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>

    <div class="login-container">
        <div class="login-card">
            <div class="login-image">
                <img src="img/login-cat.png" alt="Cat pointing at viewer">
            </div>
            <div class="login-form">
                <a href="index.html" class="site-brand">AZIISUU.EXE</a>
                <h2>WELKAM BEK ATMINT</h2>
                <p class="subtitle">Login ini cuma khusus Atmint aja ygy.</p>

                <?php
                if (isset($_GET['error'])) {
                    echo '<p class="error-message">Username atau Password salah!</p>';
                }
                ?>
                
                <form action="proses_login.php" method="POST">
                    <div class="input-group">
                        <input type="text" id="username" name="username" placeholder="Username" required>
                    </div>
                    <div class="input-group">
                        <input type="password" id="password" name="password" placeholder="Password" required>
                    </div>
                    <div class="form-options">
                        <label for="remember-me">
                            <input type="checkbox" id="remember-me">
                            Remember me
                        </label>
                    </div>
                    <button type="submit" class="login-button">Login</button>
                </form>
            </div>
        </div>
    </div>

</body>
</html>