# Auto-generated ML Pipeline
import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np

import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.optimizers import Adam

# Dataset Configuration
dataset = {
"type": "ImageFolder",
"path": "/data/images",
"batch_size": 32,
"shuffle": true
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
"width": 224,
"height": 224
},
"normalization": {
"mean": [
0.485,
0.456,
0.406
],
"std": [
0.229,
0.224,
0.225
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

    
model.add(Conv2D(
                64,
(3, 3),
activation='relu',
name='ConvLayer1'
))
            
model.add(MaxPooling2D(pool_size=(2, 2), name='MaxPoolLayer1'))
            
model.add(Conv2D(
                128,
(3, 3),
activation='relu',
name='ConvLayer2'
))
            
model.add(MaxPooling2D(pool_size=(2, 2), name='MaxPoolLayer2'))
            
model.add(Flatten(name='FlattenLayer'))
            
model.add(Dense(
                512,
activation='relu',
name='DenseLayer1'
))
            
model.add(Dense(
                10,
activation='softmax',
name='DenseLayer2'
))
            

model.add(Dense(10, activation='softmax'))  # Output layer

# Training Configuration
epochs = 10
learning_rate = 0.001
optimizer = Adam(lr=learning_rate)
loss_function = 'categorical_crossentropy'

model.compile(optimizer=optimizer, loss=loss_function, metrics=['accuracy'])

model.fit(train_data, epochs=epochs)







    