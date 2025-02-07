<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text" indent="yes"/>

<xsl:template match="/" name="pipeline">
<xsl:text># Auto-generated ML Pipeline&#10;</xsl:text>
<xsl:text>import pandas as pd&#10;</xsl:text>

<!-- Dynamic Imports -->
<xsl:choose>
    <xsl:when test="pipeline/@library='tensorflow'">
<xsl:text>import tensorflow as tf&#10;</xsl:text>
<xsl:text>from tensorflow.keras.layers import Dense, Dropout&#10;</xsl:text>
<xsl:text>from tensorflow.keras.wrappers.scikit_learn import KerasRegressor, KerasClassifier&#10;</xsl:text>
    </xsl:when>
    
    <xsl:when test="pipeline/@library='pytorch'">
<xsl:text>import torch&#10;</xsl:text>
<xsl:text>import torch.nn as nn&#10;</xsl:text>
<xsl:text>import torch.optim as optim&#10;</xsl:text>
<xsl:text>from skorch import NeuralNetRegressor, NeuralNetClassifier&#10;</xsl:text>
    </xsl:when>
    
    <xsl:otherwise>
<xsl:if test="pipeline/@library='xgboost'">
<xsl:text>from xgboost import </xsl:text>
<xsl:choose>
    <xsl:when test="pipeline/@task='Regression'">XGBRegressor</xsl:when>
    <xsl:otherwise>XGBClassifier</xsl:otherwise>
</xsl:choose>
<xsl:text>&#10;</xsl:text>
</xsl:if>
    </xsl:otherwise>
</xsl:choose>

<!-- Common ML imports -->
<xsl:if test="pipeline/preProcessing/step">
<xsl:text>from sklearn.pipeline import Pipeline&#10;</xsl:text>
</xsl:if>
<xsl:text>from sklearn.model_selection import train_test_split&#10;</xsl:text>
<xsl:text>from sklearn.metrics import </xsl:text>
<xsl:value-of select="pipeline/evaluation/metric"/><xsl:text>&#10;</xsl:text>

<!-- Data Loading -->
<xsl:text>&#10;# Data Loading&#10;</xsl:text>
<xsl:text>data = pd.read_csv('</xsl:text><xsl:value-of select="pipeline/dataset/@path"/><xsl:text>')&#10;</xsl:text>

<!-- Feature Engineering -->
<xsl:text>features = [</xsl:text>
<xsl:for-each select="pipeline/dataset/features/feature">
'<xsl:value-of select="name"/>'<xsl:if test="position() != last()">, </xsl:if>
</xsl:for-each>
<xsl:text>]&#10;</xsl:text>
<xsl:text>target = '</xsl:text><xsl:value-of select="pipeline/dataset/target/name"/><xsl:text>'&#10;</xsl:text>
<xsl:text>X = data[features]&#10;</xsl:text>
<xsl:text>y = data[target]&#10;&#10;</xsl:text>

<!-- Preprocessing Pipeline -->
<xsl:if test="pipeline/preProcessing/step">
<xsl:text># Preprocessing Steps&#10;</xsl:text>
<xsl:text>preprocessing = [</xsl:text>
<xsl:for-each select="pipeline/preProcessing/step">
    <xsl:choose>
        <xsl:when test="type='imputation'">
    ('imputer', SimpleImputer(strategy='<xsl:value-of select="parameters/parameter[key='strategy']/value"/>'))</xsl:when>
        <xsl:when test="type='scaling'">
    ('scaler', <xsl:value-of select="parameters/parameter[key='method']/value"/>Scaler())</xsl:when>
    </xsl:choose>
    <xsl:if test="position() != last()">,</xsl:if>
</xsl:for-each>
<xsl:text>]&#10;&#10;</xsl:text>
</xsl:if>

<!-- Model Architecture -->
<xsl:text># Model Definition&#10;</xsl:text>
<xsl:choose>
    <xsl:when test="pipeline/@library='tensorflow'">
<xsl:text>def create_model():&#10;</xsl:text>
<xsl:text>    model = tf.keras.Sequential([&#10;</xsl:text>
<xsl:for-each select="pipeline/model/arch/layer">
<xsl:text>        tf.keras.layers.</xsl:text><xsl:value-of select="@type"/>
<xsl:text>(units=</xsl:text><xsl:value-of select="@units"/>
<xsl:if test="@activation">, activation='<xsl:value-of select="@activation"/>'</xsl:if>
<xsl:text>),&#10;</xsl:text>
</xsl:for-each>
<xsl:text>    ])&#10;</xsl:text>
<xsl:text>    model.compile(&#10;</xsl:text>
<xsl:text>        optimizer='</xsl:text><xsl:value-of select="pipeline/model/hyperparameters/optimizer"/><xsl:text>'</xsl:text>
<xsl:text>,&#10;        loss='</xsl:text><xsl:value-of select="pipeline/model/hyperparameters/loss"/><xsl:text>'</xsl:text>
<xsl:if test="pipeline/model/hyperparameters/metrics">
<xsl:text>,&#10;        metrics=[</xsl:text>
<xsl:for-each select="pipeline/model/hyperparameters/metrics/metric">
'<xsl:value-of select="."/>'<xsl:if test="position() != last()">, </xsl:if>
</xsl:for-each>
<xsl:text>]</xsl:text>
</xsl:if>
<xsl:text>&#10;    )&#10;</xsl:text>
<xsl:text>    return model&#10;&#10;</xsl:text>
<xsl:text>model = Keras</xsl:text>
<xsl:choose>
    <xsl:when test="pipeline/@task='Regression'">Regressor</xsl:when>
    <xsl:otherwise>Classifier</xsl:otherwise>
</xsl:choose>
<xsl:text>(build_fn=create_model, </xsl:text>
<xsl:for-each select="pipeline/model/hyperparameters/param">
<xsl:value-of select="@name"/>=<xsl:value-of select="."/>
<xsl:if test="position() != last()">, </xsl:if>
</xsl:for-each>
<xsl:text>)&#10;&#10;</xsl:text>
    </xsl:when>

    <xsl:when test="pipeline/@library='pytorch'">
<xsl:text>class TorchModel(nn.Module):&#10;</xsl:text>
<xsl:text>    def __init__(self):&#10;</xsl:text>
<xsl:text>        super().__init__()&#10;</xsl:text>
<xsl:for-each select="pipeline/model/arch/layer">
<xsl:text>        self.layer</xsl:text><xsl:value-of select="position()"/><xsl:text> = nn.</xsl:text>
<xsl:choose>
    <xsl:when test="@type='dense'">Linear</xsl:when>
    <xsl:otherwise><xsl:value-of select="@type"/></xsl:otherwise>
</xsl:choose>
<xsl:text>(</xsl:text>
<xsl:value-of select="@input_features"/><xsl:text>, </xsl:text><xsl:value-of select="@output_features"/>
<xsl:if test="@activation">
<xsl:text>)&#10;        self.act</xsl:text><xsl:value-of select="position()"/><xsl:text> = nn.</xsl:text>
<xsl:choose>
    <xsl:when test="@activation='relu'">ReLU</xsl:when>
    <xsl:when test="@activation='sigmoid'">Sigmoid</xsl:when>
    <xsl:otherwise><xsl:value-of select="@activation"/></xsl:otherwise>
</xsl:choose>
</xsl:if>
<xsl:text>)&#10;</xsl:text>
</xsl:for-each>
<xsl:text>&#10;    def forward(self, x):&#10;</xsl:text>
<xsl:for-each select="pipeline/model/arch/layer">
<xsl:text>        x = self.layer</xsl:text><xsl:value-of select="position()"/><xsl:text>(x)&#10;</xsl:text>
<xsl:if test="@activation">
<xsl:text>        x = self.act</xsl:text><xsl:value-of select="position()"/><xsl:text>(x)&#10;</xsl:text>
</xsl:if>
</xsl:for-each>
<xsl:text>        return x&#10;&#10;</xsl:text>
<xsl:text>model = NeuralNet</xsl:text>
<xsl:choose>
    <xsl:when test="pipeline/@task='Regression'">Regressor</xsl:when>
    <xsl:otherwise>Classifier</xsl:otherwise>
</xsl:choose>
<xsl:text>(&#10;</xsl:text>
<xsl:text>    module=TorchModel,&#10;</xsl:text>
<xsl:text>    optimizer=optim.</xsl:text><xsl:value-of select="pipeline/model/hyperparameters/optimizer"/><xsl:text>,&#10;</xsl:text>
<xsl:text>    criterion=nn.</xsl:text><xsl:value-of select="pipeline/model/hyperparameters/loss"/><xsl:text>,&#10;</xsl:text>
<xsl:text>    max_epochs=</xsl:text><xsl:value-of select="pipeline/model/hyperparameters/epochs"/><xsl:text>,&#10;</xsl:text>
<xsl:text>    batch_size=</xsl:text><xsl:value-of select="pipeline/model/hyperparameters/batch_size"/><xsl:text>&#10;</xsl:text>
<xsl:text>)&#10;&#10;</xsl:text>
    </xsl:when>
</xsl:choose>

<!-- Pipeline Construction -->
<xsl:if test="pipeline/preProcessing/step">
<xsl:text># Full Pipeline&#10;</xsl:text>
<xsl:text>pipeline = Pipeline([</xsl:text>
<xsl:for-each select="pipeline/preProcessing/step">
    ('preprocessing_<xsl:value-of select="position()"/>', preprocessing[<xsl:value-of select="position()-1"/>])<xsl:if test="position() != last()">, </xsl:if>
</xsl:for-each>
<xsl:text>, ('model', model)])&#10;&#10;</xsl:text>
</xsl:if>

<!-- Training & Evaluation -->
<xsl:text># Data Splitting&#10;</xsl:text>
<xsl:text>X_train, X_test, y_train, y_test = train_test_split(&#10;</xsl:text>
<xsl:text>    X, y, test_size=</xsl:text>
<xsl:value-of select="pipeline/data_split/test_size"/><xsl:text>, random_state=</xsl:text>
<xsl:value-of select="pipeline/data_split/random_state"/><xsl:text>&#10;)&#10;&#10;</xsl:text>

<xsl:text># Model Training&#10;</xsl:text>
<xsl:text>pipeline.fit(X_train, y_train)&#10;&#10;</xsl:text>

<xsl:text># Evaluation&#10;</xsl:text>
<xsl:text>predictions = pipeline.predict(X_test)&#10;</xsl:text>
<xsl:text>print("</xsl:text><xsl:value-of select="pipeline/evaluation/metric"/><xsl:text>: ", </xsl:text>
<xsl:value-of select="pipeline/evaluation/metric"/><xsl:text>(y_test, predictions))&#10;</xsl:text>
</xsl:template>

</xsl:stylesheet>