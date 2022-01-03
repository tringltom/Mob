import { Button, Divider, Title } from '@muratoner/semantic-ui-react-native';
import { useFormik } from 'formik';
import React, { useContext, useRef } from 'react';
import { View, TextInput as RNTextInput } from 'react-native';
import TextInput from '../../form/TextInput';
import { combineValidators, composeValidators, hasLengthLessThan, isRequired, isRequiredIf } from 'revalidate';
import { ActivityTypes, IActivityFormValues } from '../../models/activity';
import FileInput from '../../form/FileInput';
import { RootStoreContext } from '../../stores/rootStore';
import ModalYesNo from '../../modals/ModalYesNo';
import { observer } from 'mobx-react-lite';

const validate = combineValidators({
  title: composeValidators(
    isRequired({ message: "Naziv je neophodan" }),
    hasLengthLessThan(50)({
      message: "Za naziv je dozvoljeno maksimalno 50 karaktera",
    })
  )(),
  answer: composeValidators(
    isRequired({ message: "Odgovor je neophodan" }),
    hasLengthLessThan(100)({
      message: "Za odgovor je dozvoljeno maksimalno 100 karaktera",
    })
  )(),
  description: composeValidators(
    isRequiredIf()((values: { image: any; }) => values && !values.image)({message: 'Opis je obavezan ukoliko niste priložili sliku' }),
    hasLengthLessThan(250)({
      message: "Za opis je dozvoljeno maksimalno 250 karaktera",
    })
  )(),
});

const PuzzleForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { create } = rootStore.activityStore;
  const { openModal } = rootStore.modalStore;

  const descriptionRef = useRef<RNTextInput>();
  const answerRef = useRef<RNTextInput>();

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      title: "",
      type: ActivityTypes.Puzzle,
      description: "",
      images: null,
      answer: ""
    },
    validate: validate,
    onSubmit: (values: IActivityFormValues) => openModal(
      <ModalYesNo
        handleConfirmation={() => 
          create(values)
        }
        content="Nova Zagonetka"
        icon="puzzle-piece"
      />)
    
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Title>Zagonetka</Title>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}>
        <TextInput
          placeholder="Naziv"
          autoCapitalize="none"
          returnKeyType="next"
          returnKeyLabel="next"
          onBlur={handleBlur("title")}
          error={errors.title}
          touched={touched.title}
          onChangeText={handleChange("title")}
          onSubmitEditing={() => descriptionRef.current?.focus()}
          blurOnSubmit={false}
        />
        <Divider title={"Priložite sliku ili opišite zagonetku"} />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}>
        <FileInput onChange={handleChange('images')}/>
        <TextInput
          multiline
          numberOfLines={1}
          textAlignVertical="top"
          placeholder="Opis"
          onChangeText={handleChange("description")}
          onBlur={handleBlur("description")}
          value={values.description}
          error={errors.description}
          touched={touched.description}
          ref={descriptionRef}
          returnKeyType="next"
          returnKeyLabel="next"
          blurOnSubmit={true}
        />
        <TextInput
          onChangeText={handleChange("answer")}
          onBlur={handleBlur("answer")}
          value={values.answer}
          placeholder="Odgovor"
          error={errors.answer}
          touched={touched.answer}
          ref={answerRef}
          returnKeyType="go"
          returnKeyLabel="go"
          onSubmitEditing={() => handleSubmit()}
        />
        <Button
          title="Kreiraj"
          color="primary"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default observer(PuzzleForm);