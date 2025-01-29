<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="text" encoding="UTF-8" indent="no" />

	<!-- Template to match the root element -->
	<xsl:template match="/pipeline">
		<!-- Import necessary libraries -->
		<xsl:text>import pandas as pd&#10;</xsl:text>
		<xsl:text>from sklearn.model_selection import train_test_split&#10;</xsl:text>
		<xsl:text>from sklearn.preprocessing import Imputer&#10;</xsl:text>
		<xsl:text>from sklearn.metrics import mean_squared_error&#10;</xsl:text>
		<xsl:choose>
			<xsl:when test="@library='xgboost'">
				<xsl:text>from xgboost import XGBRegressor&#10;</xsl:text>
			</xsl:when>
			<xsl:when test="@library='sklearn'">
				<xsl:text>from sklearn.linear_model import LinearRegression&#10;</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text># Unsupported library&#10;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>&#10;</xsl:text>

		<!-- Load dataset -->
		<xsl:text># Load dataset&#10;</xsl:text>
		<xsl:text>data = pd.read_csv('</xsl:text>
		<xsl:value-of select="dataset/@path" />
		<xsl:text>')&#10;</xsl:text>
		<xsl:text>&#10;</xsl:text>

		<!-- Define features and target -->
		<xsl:text># Define features and target&#10;</xsl:text>
		<xsl:text>X = data[[</xsl:text>
		<xsl:for-each select="dataset/features/feature">
			<xsl:text>'</xsl:text>
			<xsl:value-of select="name" />
			<xsl:text>'</xsl:text>
			<xsl:if test="position() != last()">, </xsl:if>
		</xsl:for-each>
		<xsl:text>]]&#10;</xsl:text>
		<xsl:text>y = data['</xsl:text>
		<xsl:value-of select="dataset/target/name" />
		<xsl:text>']&#10;</xsl:text>
		<xsl:text>&#10;</xsl:text>

		<!-- Preprocessing steps -->
		<xsl:text># Preprocessing steps&#10;</xsl:text>
		<xsl:for-each select="preProcessing/step">
			<xsl:text># </xsl:text>
			<xsl:value-of select="name" />
			<xsl:text>&#10;</xsl:text>
			<xsl:if test="type='imputation'">
				<xsl:text>imputer = Imputer(strategy='</xsl:text>
				<xsl:value-of select="parameters/parameter[key='strategy']/value" />
				<xsl:text>')&#10;</xsl:text>
				<xsl:text>X = imputer.fit_transform(X)&#10;</xsl:text>
			</xsl:if>
			<xsl:text>&#10;</xsl:text>
		</xsl:for-each>

		<!-- Split dataset into training and testing sets -->
		<xsl:text># Split dataset into training and testing sets&#10;</xsl:text>
		<xsl:text>X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)&#10;</xsl:text>
		<xsl:text>&#10;</xsl:text>

		<!-- Define model -->
		<xsl:text># Define model&#10;</xsl:text>
		<xsl:choose>
			<xsl:when test="@library='xgboost'">
				<xsl:text>model = XGBRegressor(</xsl:text>
				<xsl:for-each select="model/hyperparameters/hyperparameter">
					<xsl:value-of select="name" />
					<xsl:text>=</xsl:text>
					<xsl:value-of select="value" />
					<xsl:if test="position() != last()">, </xsl:if>
				</xsl:for-each>
				<xsl:text>)&#10;</xsl:text>
			</xsl:when>
			<xsl:when test="@library='sklearn'">
				<xsl:text>model = LinearRegression()&#10;</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text># Unsupported library&#10;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>&#10;</xsl:text>

		<!-- Train model -->
		<xsl:text># Train model&#10;</xsl:text>
		<xsl:text>model.fit(X_train, y_train)&#10;</xsl:text>
		<xsl:text>&#10;</xsl:text>

		<!-- Evaluate model -->
		<xsl:text># Evaluate model&#10;</xsl:text>
		<xsl:text>y_pred = model.predict(X_test)&#10;</xsl:text>
		<xsl:choose>
			<xsl:when test="evaluation/metric='root_mean_square'">
				<xsl:text>rmse = mean_squared_error(y_test, y_pred, squared=False)&#10;</xsl:text>
				<xsl:text>print("Root Mean Squared Error:", rmse)&#10;</xsl:text>
			</xsl:when>
			<xsl:when test="evaluation/metric='accuracy'">
				<xsl:text>accuracy = model.score(X_test, y_test)&#10;</xsl:text>
				<xsl:text>print("Accuracy:", accuracy)&#10;</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text># Unsupported metric&#10;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
