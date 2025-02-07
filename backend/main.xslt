<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text" indent="yes"/>
    <xsl:include href="./xslt/ImageClassification.xslt"/>
    <xsl:include href="./pipeline.xslt"/>
<xsl:template match="/">
    <xsl:text># Auto-generated ML Pipeline&#10;</xsl:text>
    <xsl:text>import pandas as pd&#10;</xsl:text>
    <xsl:text>from sklearn.model_selection import train_test_split&#10;</xsl:text>
    <xsl:text>import numpy as np&#10;</xsl:text>
    <xsl:choose>
        <xsl:when test="/pipeline/ImageClassification">
            <xsl:call-template name="ImageClassification" />
        </xsl:when>
        <xsl:otherwise >
            <xsl:call-template name="pipeline" />
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

</xsl:stylesheet>