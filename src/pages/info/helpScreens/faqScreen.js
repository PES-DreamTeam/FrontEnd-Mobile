import { ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { List } from "react-native-paper";

function FaqScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          accessibilityLabel="Press me"
          accessibilityHint="Navigates back to the main list of buttons"
          name="arrow-back-outline"
          onPress={() => navigation.goBack()}
          size={25}
        />
      ),
    });
  });
  const maxQuestionLines = 2;
  const maxAnswerLines = 5;
  return (
    <>
    <ScrollView>
      <List.Section title="General">
        <List.Accordion
          title="Qué es EcoRoads?"
          accessibilityLabel="Tap me!"
          titleStyle={styles.question}
          titleNumberOfLines={maxQuestionLines}
        >
          <List.Item
            title="EcoRoads és una aplicación de movilidad personal, que pone a tu disposición información y servicios para facilitar tus viajes usando vehículos eléctricos."
            titleStyle={styles.answer}
            accessibilityHint="Question displayed"
            titleNumberOfLines={maxAnswerLines}
          />
        </List.Accordion>
        <List.Accordion
          title="Habrá más servicios dentro de EcoRoads?"
          accessibilityLabel="Tap me!"
          titleStyle={styles.question}
          titleNumberOfLines={maxQuestionLines}
        >
          <List.Item
            title="Sí, EcoRoads és una aplicación que estará en constante crecimiento,
        con el fin de poder ofrecer en todo momento el mejor servicio posible"
            titleStyle={styles.answer}
            accessibilityHint="Question displayed"
            titleNumberOfLines={maxAnswerLines}
          />
        </List.Accordion>
        <List.Accordion
          title="Tiene algun coste utilizar EcoRoads?"
          accessibilityLabel="Tap me!"
          titleStyle={styles.question}
          titleNumberOfLines={maxQuestionLines}
        >
          <List.Item
            title="La descarga y el uso de la aplicación és completamente gratuito."
            titleStyle={styles.answer}
            accessibilityHint="Question displayed"
            titleNumberOfLines={maxAnswerLines}
          />
        </List.Accordion>
        <List.Accordion
          title="Puedo personalizar el mapa?"
          accessibilityLabel="Tap me!"
          titleStyle={styles.question}
          titleNumberOfLines={maxQuestionLines}
        >
          <List.Item
            title="Sí, puedes filtrar fácilmente en el mapa la información de los puntos de carga que quieras consultar en todo momento.
            Además puedes añadir estaciones a tu sección de favoritos y filtrar el mapa en base a estos "
            titleStyle={styles.answer}
            accessibilityHint="Question displayed"
            titleNumberOfLines={maxAnswerLines}
          />
        </List.Accordion>
        <List.Accordion
          title="Qué hago si tengo una incidencia técnica"
          accessibilityLabel="Tap me!"
          titleStyle={styles.question}
          titleNumberOfLines={maxQuestionLines}
        >
          <List.Item
            title="Si se trata de una incidencia técnica relacionada con algún punto de carga, 
        puedes acceder al modal de información adicional de esa estación para reportar directamente el problema que tengas."
            titleStyle={styles.answer}
            accessibilityHint="Question displayed"
            titleNumberOfLines={maxAnswerLines}
          />

          <List.Item
            title="Si se trata de una incidencia técnica de la aplicación, 
        puedes acceder a la sección de reportes de la aplicación, situada en la barra de navegación lateral."
            titleStyle={styles.answer}
            titleNumberOfLines={maxAnswerLines}
          />
        </List.Accordion>
        <List.Accordion
          title="Puedo personalizar el mapa?"
          accessibilityLabel="Tap me!"
          titleStyle={styles.question}
          titleNumberOfLines={maxQuestionLines}
        >
          <List.Item
            title="Sí, puedes filtrar fácilmente en el mapa la información de los puntos de carga que quieras consultar en todo momento.
         Además puedes guardar estaciones en favoritos."
            titleStyle={styles.answer}
            accessibilityHint="Question displayed"
            titleNumberOfLines={maxAnswerLines}
          />
        </List.Accordion>
      </List.Section>
      <List.Section title="Registro y cuenta">
        <List.Accordion
          title="Es necesario registarse para utilizar EcoRoads?"
          accessibilityLabel="Tap me!"
          titleStyle={styles.question}
          titleNumberOfLines={maxQuestionLines}
        >
          <List.Item
            title="Sin una cuenta de usuario no podrás acceder a las funcionalidades de EcoRoads, 
        por lo tanto es imprescindible que te registres."
            titleStyle={styles.answer}
            accessibilityHint="Question displayed"
            titleNumberOfLines={maxAnswerLines}
          />
        </List.Accordion>
        <List.Accordion
          title="Están seguros mis datos de vehículos en el sistema?"
          accessibilityLabel="Tap me!"
          titleStyle={styles.question}
          titleNumberOfLines={maxQuestionLines}
        >
          <List.Item
            title="Sí, toda la información está encriptada y cumple con los estándares de seguridad más exigentes"
            titleStyle={styles.answer}
            accessibilityHint="Question displayed"
            titleNumberOfLines={maxAnswerLines}
          />
        </List.Accordion>
        <List.Accordion
          title="Qué tengo que hacer si quiero dar de baja mi cuenta de EcoRoads?"
          accessibilityLabel="Tap me!"
          titleStyle={styles.question}
          titleNumberOfLines={maxQuestionLines}
        >
          <List.Item
            title="Lo puedes hacer desde la app, en la sección de configuración, en la barra de navegación lateral.
        Pulsando en el boton de 'Eliminar Cuenta', toda tu información se eliminará de la base de datos de EcoRoads. "
            titleStyle={styles.answer}
            accessibilityHint="Question displayed"
            titleNumberOfLines={maxAnswerLines}
          />
        </List.Accordion>
      </List.Section>
    </ScrollView>
  </>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 15,
  },
  answer: {
    fontSize: 13,
    textAlign: "justify",
  },
});

export default FaqScreen;
