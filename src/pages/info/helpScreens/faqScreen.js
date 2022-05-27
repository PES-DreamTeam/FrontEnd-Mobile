import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { List } from "react-native-paper";
import i18n from "i18n-js";

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
  const maxQuestionLines = 1;
  const maxAnswerLines = 5;
  const customStyle = require("../../../utils/customStyleSheet");
  return (
    <>
      <ScrollView>
        <View style={[customStyle.coolBlockTitleContainer, {borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: '#c5a9fc'}]}>
          <Text style={customStyle.bigTitle}>
              {i18n.t('faq.generalHelp')}
          </Text>
        </View>
          <List.Accordion
            title={i18n.t('faq.whatIsEcoroads')}
            titleStyle={styles.question}
            titleNumberOfLines={maxQuestionLines}
          >
            <List.Item
              title={i18n.t('faq.answerWhatIsEcoroads')}
              titleStyle={styles.answer}
              titleNumberOfLines={maxAnswerLines}
            />
          </List.Accordion>
          <List.Accordion
            title={i18n.t('faq.moreServicesEcoroads')}
            titleStyle={styles.question}
            titleNumberOfLines={maxQuestionLines}
          >
            <List.Item
              title={i18n.t('faq.answerMoreServicesEcoroads')}
              titleStyle={styles.answer}
              titleNumberOfLines={maxAnswerLines}
            />
          </List.Accordion>
          <List.Accordion
            title={i18n.t('faq.isThereCost')}
            titleStyle={styles.question}
            titleNumberOfLines={maxQuestionLines}
          >
            <List.Item
              title={i18n.t('faq.answerIsThereCost')}
              titleStyle={styles.answer}
              titleNumberOfLines={maxAnswerLines}
            />
          </List.Accordion>
          <List.Accordion
            title={i18n.t('faq.personalizeMap')}
            titleStyle={styles.question}
            titleNumberOfLines={maxQuestionLines}
          >
            <List.Item
              title={i18n.t('faq.answerPersonalizeMap')}
              titleStyle={styles.answer}
              titleNumberOfLines={maxAnswerLines}
            />
          </List.Accordion>
          <List.Accordion
            title={i18n.t('faq.technicalIncidence')}
            titleStyle={styles.question}
            titleNumberOfLines={maxQuestionLines}
          >
            <List.Item
              title={i18n.t('faq.answer1TechnicalIncidence')}
              titleStyle={styles.answer}
              titleNumberOfLines={maxAnswerLines}
            />

            <List.Item
              title={i18n.t('faq.answer2TechnicalIncidence')}
              titleStyle={styles.answer}
              titleNumberOfLines={maxAnswerLines}
            />
          </List.Accordion>
          <View style={[customStyle.coolBlockTitleContainer, {borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: '#c5a9fc'}]}>
            <Text style={customStyle.bigTitle}>
                {i18n.t('faq.accountHelp')}
            </Text>
          </View>
          <List.Accordion
            title={i18n.t('faq.mandatorySignIn')}
            titleStyle={styles.question}
            titleNumberOfLines={maxQuestionLines}
          >
            <List.Item
              title={i18n.t('faq.answerMandatorySignIn')}
              titleNumberOfLines={maxAnswerLines}
              titleStyle={styles.answer}

            />
          </List.Accordion>
          <List.Accordion
            title={i18n.t('faq.safeData')}
            titleStyle={styles.question}
            titleNumberOfLines={maxQuestionLines}
          >
            <List.Item
              title={i18n.t('faq.answerSafeData')}
              titleStyle={styles.answer}
              titleNumberOfLines={maxAnswerLines}
            />
          </List.Accordion>
          <List.Accordion
            title={i18n.t('faq.howToDelete')}
            titleStyle={styles.question}
            titleNumberOfLines={maxQuestionLines}
          >
            <List.Item
              title={i18n.t('faq.answerHowToDelete')}
              titleStyle={styles.answer}
              titleNumberOfLines={maxAnswerLines}
            />
          </List.Accordion>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 15,
    fontFamily: "Montserrat-Bold",
  },
  answer: {
    fontSize: 15,
    textAlign: "justify",
    fontFamily: "Montserrat-Regular",
    marginHorizontal: 15,
  },
});

export default FaqScreen;