# Dossier du projet (racine)
$projectDir = Get-Location

# Extensions HTML à traiter
$htmlFiles = Get-ChildItem -Path $projectDir -Recurse -Filter "*.html"

Write-Host "🔍 Analyse des fichiers HTML..." -ForegroundColor Yellow

foreach ($file in $htmlFiles) {

    Write-Host "➡️ Traitement : $($file.FullName)" -ForegroundColor Cyan

    $content = Get-Content $file.FullName -Raw

    # Mapping Django URL -> Fichier statique
    $content = $content -replace 'href="/services/"', 'href="services.html"'
    $content = $content -replace 'href="/about/"', 'href="about.html"'
    $content = $content -replace 'href="/contact/"', 'href="contact.html"'
    $content = $content -replace 'href="/careers/"', 'href="careers.html"'
    $content = $content -replace 'href="/faq/"', 'href="faq.html"'
    $content = $content -replace 'href="/legal/"', 'href="legal.html"'
    $content = $content -replace 'href="/blog/"', 'href="blog.html"'
    $content = $content -replace 'href="/press/"', 'href="press.html"'
    $content = $content -replace 'href="/documentation/"', 'href="documentation.html"'
    $content = $content -replace 'href="/warranty/"', 'href="warranty.html"'
    $content = $content -replace 'href="/privacy/"', 'href="privacy.html"'
    $content = $content -replace 'href="/cookies/"', 'href="cookies.html"'

    # Écriture du fichier modifié
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

Write-Host "✅ Conversion terminée : liens Django → HTML statique" -ForegroundColor Green
