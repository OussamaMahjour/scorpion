<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

    <xsl:output method="text" indent="yes"/>

<xsl:template match="/pipeline/ImageClassification" name="ImageClassification">
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.optimizers import Adam

# Dataset Configuration
dataset = {
"type": "<xsl:value-of select="/pipeline/ImageClassification/dataset/type"/>",
"path": "<xsl:value-of select="/pipeline/ImageClassification/dataset/path"/>",
"batch_size": <xsl:value-of select="/pipeline/ImageClassification/dataset/batchSize"/>,
"shuffle": <xsl:value-of select="/pipeline/ImageClassification/dataset/shuffle"/>
}

# Load the dataset using ImageDataGenerator
datagen = ImageDataGenerator(rescale=1./255)
train_data = datagen.flow_from_directory(
dataset['path'],
target_size=(224, 224),
batch_size=dataset['batch_size'],
shuffle=dataset['shuffle'],
class_mode='categorical'
)

# Preprocessing Configuration
preprocess = {
"resize": {
"width": <xsl:value-of select="/pipeline/ImageClassification/preprocessing/resize/width"/>,
"height": <xsl:value-of select="/pipeline/ImageClassification/preprocessing/resize/height"/>
},
"normalization": {
"mean": [
<xsl:value-of select="/pipeline/ImageClassification/preprocessing/normalization/mean[1]"/>,
<xsl:value-of select="/pipeline/ImageClassification/preprocessing/normalization/mean[2]"/>,
<xsl:value-of select="/pipeline/ImageClassification/preprocessing/normalization/mean[3]"/>
],
"std": [
<xsl:value-of select="/pipeline/ImageClassification/preprocessing/normalization/std[1]"/>,
<xsl:value-of select="/pipeline/ImageClassification/preprocessing/normalization/std[2]"/>,
<xsl:value-of select="/pipeline/ImageClassification/preprocessing/normalization/std[3]"/>
]
}
}

# Image preprocessing (resize, normalization)
train_data = train_data.map(
lambda x, y: (
tf.image.resize(x, [preprocess['resize']['height'], preprocess['resize']['width']]),
(x - preprocess['normalization']['mean']) / preprocess['normalization']['std']
)
)

# Model Configuration
model = Sequential()

    <xsl:for-each select="/pipeline/ImageClassification/model/layers/layer">
        <xsl:variable name="layerType" select="@type"/>
        <xsl:variable name="layerName" select="name"/>
        <xsl:variable name="layerUnits" select="units"/>
        <xsl:variable name="activation" select="activation"/>

        <xsl:choose>
            <xsl:when test="$layerType = 'Conv2D'">
model.add(Conv2D(
                <xsl:value-of select="$layerUnits"/>,
(3, 3),
activation='<xsl:value-of select="$activation"/>',
name='<xsl:value-of select="$layerName"/>'
))
            </xsl:when>
            <xsl:when test="$layerType = 'MaxPooling2D'">
model.add(MaxPooling2D(pool_size=(2, 2), name='<xsl:value-of select="$layerName"/>'))
            </xsl:when>
            <xsl:when test="$layerType = 'Flatten'">
model.add(Flatten(name='<xsl:value-of select="$layerName"/>'))
            </xsl:when>
            <xsl:when test="$layerType = 'Dense'">
model.add(Dense(
                <xsl:value-of select="$layerUnits"/>,
activation='<xsl:value-of select="$activation"/>',
name='<xsl:value-of select="$layerName"/>'
))
            </xsl:when>
        </xsl:choose>
    </xsl:for-each>

model.add(Dense(10, activation='softmax'))  # Output layer

# Training Configuration
epochs = <xsl:value-of select="/pipeline/ImageClassification/training/epochs"/>
learning_rate = <xsl:value-of select="/pipeline/ImageClassification/training/learningRate"/>
optimizer = Adam(lr=learning_rate)
loss_function = '<xsl:value-of select="/pipeline/ImageClassification/training/lossFunction"/>'

model.compile(optimizer=optimizer, loss=loss_function, metrics=['accuracy'])

model.fit(train_data, epochs=epochs)







    </xsl:template>

</xsl:stylesheet>
