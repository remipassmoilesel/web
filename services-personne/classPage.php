<?php

class Page {

    /**
     * Le squelette HTML5 d'une page
     * @var type 
     */
    public $pageStub;

    /**
     * Le titre de la page
     * @var type 
     */
    public $pageTitle;

    /**
     * Le contenu d'introduction de la page
     * @var type 
     */
    public $introductionContent;

    /**
     * Mention copyright
     * @var type 
     */
    public $copyrightMention;

    /**
     * Les titres des rubriques
     * @var type 
     */
    public $sectionTitles;

    /**
     * les Contenus des rubriques
     * @var type 
     */
    public $sectionContents;

    public function __construct() {
        // chargement du squelette
        $this->pageStub = file_get_contents('stub.html');
    }

    private function getSectionTitlesHtml() {

        $output = "";

        $model = "<li><a href='#%id'>%title</a></li>";

        foreach ($this->sectionTitles as $c => $v) {
            $n = str_replace("%id", "section" . $c, $model);
            $n = str_replace("%title", $v, $n);
            $output .= $n;
        }

        return $output;
    }

    private function getSectionContentsHtml() {

        $output = "";

        $model = "<section id='%id' class='wrapper style2 spotlights'>%content</section>";

        foreach ($this->sectionContents as $c => $v) {
            $n = str_replace("%id", "section" . $c, $model);
            $n = str_replace("%content", $v, $n);
            $output .= $n;
        }

        return $output;
    }

    public static $PAGE_TITLE_TAG = "%%pageTitle%%";
    public static $INTRODUCTION_CONTENT_TAG = "%%introductionContent%%";
    public static $SECTION_TITLE_TAG = "%%sectionTitles%%";
    public static $SECTION_CONTENT_TAG = "%%sectionContents%%";
    public static $COPYRIGHT_TAG = "%%copyightMention%%";

    public function printPage() {

        // verifier qu'il y ai bien un titre par contenu
        $st = sizeof($this->sectionTitles);
        $sc = sizeof($this->sectionContents);
        if ($st != $sc) {
            throw new Exception("Page content not valid: Titles: " . $st . " Contents: " . $sc);
        }

        // récupérer le contenu
        $sectionTitlesHtml = $this->getSectionTitlesHtml();
        $sectionContentsHtml = $this->getSectionContentsHtml();

        // appliquer le copyright
        $output = str_replace(Page::$PAGE_TITLE_TAG, $this->pageTitle, $this->pageStub);
        $output = str_replace(Page::$COPYRIGHT_TAG, $this->copyrightMention, $output);
        $output = str_replace(Page::$INTRODUCTION_CONTENT_TAG, $this->introductionContent, $output);
        $output = str_replace(Page::$SECTION_TITLE_TAG, $sectionTitlesHtml, $output);
        $output = str_replace(Page::$SECTION_CONTENT_TAG, $sectionContentsHtml, $output);

        echo $output;
    }

    public function setTitles($sArray) {
        $this->sectionTitles = $sArray;
    }

    public function setContents($sArray) {
        $this->sectionContents = $sArray;
    }

    public function setPageTitle($str) {
        $this->pageTitle = $str;
    }

}
