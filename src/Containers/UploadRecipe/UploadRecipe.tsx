import InfluencerHeader from "@/Components/InfluencerHeader";
import TextInput from "@/Components/TextInput";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Upload from "@/Assets/Svg/upload.svg";
import Checkbox from "@/Components/Checkbox";
import Close from "@/Assets/Svg/close.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import ImageUpload from "@/Components/ImageUpload";
import { supabase } from "@/Lib/InitSupabase";
import { useAppSelector } from "@/Store";
import Toast from "react-native-toast-message";
import { CommonActions } from "@react-navigation/native";
import { BestSellers } from "@/@types/bestSellers";
import { Cuisines } from "@/@types/cuisineDrop";
import { dropdown } from "@/@types/dropdown";
import DropData from "@/Components/DropData";
import { Category } from "@/@types/category";

interface TextInputItem {
  id: number;
}
const RecipeSchema = Yup.object().shape({
  dish_name: Yup.string().required("Dish Name is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object()
    .shape({
      value: Yup.object().shape({
        id: Yup.string().required("Id is required"),
        type: Yup.string().required("Type is required"),
      }),
      label: Yup.string().required("Category is required"),
      _index: Yup.number().required("Category is required"),
    })
    .required("Please select a Category"),
  cuisine: Yup.object()
    .shape({
      value: Yup.object().shape({
        id: Yup.string().required("Id is required"),
        label: Yup.string().required("Label is required"),
      }),
      label: Yup.string().required("Category is required"),
      _index: Yup.number().required("Category is required"),
    })
    .required("Please select a Cuisine"),
  checkboxField: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
  preparation: Yup.string(),
  ingrediant: Yup.array()
    .of(
      Yup.object().shape({
        ingrediant: Yup.string().required("Ingrediant is required"),
        qty: Yup.number().required("Quantity is required"),
        brand: Yup.string().required("Brand is required"),
        unit: Yup.string().required("Unit URL is required"),
      })
    )
    .min(1, "At least one symbol must be selected"),
  method: Yup.string(),
});

const UploadRecipe = ({
  navigation,
  route,
}: HomeNavigationProps<"UploadRecipe">) => {
  const [photo, setphoto] = useState<any>();
  const [signed_url, setsigned_url] = useState<string | undefined>("");
  const params: any = route.params;
  const item: BestSellers = params?.item;
  const update = params?.flagUpdate;
  const [cuisine, setcuisine] = useState<Cuisines[] | null>();
  const [category, setcategory] = useState<Category[] | null>();
  const [cuisineData, setcuisineData] = useState<dropdown[]>();
  const [categoryData, setcategoryData] = useState<dropdown[]>();
  const { user_id } = useAppSelector((state) => state.local);
  const success = () => {
    Toast.show({
      type: "success",
      text1: "Recipe Uploaded",
    });
    setSubmitting(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "HomeNavigator" }],
      })
    );
  };

  useEffect(() => {
    const getItems = async () => {
      const { data: category } = await supabase.from("meal_type").select("*");
      const { data: units } = await supabase.from("dish_units").select("*");
      const { data: cuisine_type } = await supabase
        .from("cuisine_type")
        .select("*");
      setcategory(category);
      setcuisine(cuisine_type);
      console.log({ cuisine_type });
    };
    getItems();
  }, []);
  useEffect(() => {
    // mapping category to its keys because of library issue
    if (category) {
      const options = category.map((item) => ({
        value: item,
        label: item.type,
      }));
      setcategoryData(options);
    }
  }, [category]);
  useEffect(() => {
    // mapping cuisine to its keys because of library issue
    if (cuisine) {
      const options = cuisine.map((item) => ({
        value: item,
        label: item.label,
      }));
      setcuisineData(options);
    }
  }, [cuisine]);
  useEffect(() => {
    const addImage = async () => {
      if (photo != undefined) {
        const pic = {
          uri: photo && photo[0]?.uri,
          type: "image/jpeg",
          name: photo && photo[0]?.fileName,
        };
        const formData = new FormData();
        formData.append("file", pic);
        const avatarFile = formData;
        await supabase.storage
          .from("dish_image")
          .upload(`${user_id}/${photo[0].fileName}`, avatarFile, {
            cacheControl: "3600",
            upsert: false,
          })
          .then(async (res) => {
            const { data: signed_url, error: sign_err } = await supabase.storage
              .from("dish_image")
              .createSignedUrl(
                `${user_id}/${photo[0].fileName}`,
                86400 * 365 * 100
              );
            setsigned_url(signed_url?.signedUrl);
          });
      }
    };
    addImage();
  }, [photo]);
  const handleAdd = () => {
    const newTextInput: TextInputItem = { id: Date.now() };
    setFieldValue("ingredient", [...values.ingredient, newTextInput]);
  };
  const handleDelete = (indexToDelete: number) => {
    const updatedTextInputs = [...values.ingredient];
    updatedTextInputs.splice(indexToDelete, 1);
    setFieldValue("ingredient", updatedTextInputs);
  };
  const UploadRec = async (
    name: string | undefined,
    desc: string | undefined,
    category: string | undefined,
    cuisine: string | undefined,
    preparation: string | undefined,
    method: string | undefined,
    ingredient: {
      ingredient: string | undefined;
      qty: number | undefined;
      brand: string | undefined;
      unit: string | undefined;
    }[],
    is_draft: boolean
  ) => {
    if (!update) {
      const { data, error } = await supabase
        .from("influencer_dishes")
        .insert([
          {
            user_id: user_id,
            name: name,
            description: desc,
            category: category,
            cuisine_type: cuisine,
            image: photo != undefined && signed_url,
            pdf: "",
            method: method,
            preparation_link: preparation,
            ingredients: ingredient.map((item) => ({
              type: item.ingredient,
              brand: item.brand,
              quantity: item.qty != null ? 0 : item.qty,
              unit: item.unit,
            })),
            is_draft: is_draft,
          },
        ])
        .select();
      data != null
        ? success()
        : Toast.show({
            type: "error",
            text1: error?.message,
          });
      setSubmitting(false);
    } else if (update) {
      const { data, error } = await supabase
        .from("influencer_dishes")
        .update([
          {
            user_id: user_id,
            name: name,
            description: desc,
            category: category,
            cuisine_type: cuisine,
            image: photo != undefined && signed_url,
            pdf: "",
            method: method,
            preparation_link: preparation,
            ingredients: ingredient.map((item) => ({
              type: item.ingredient,
              brand: item.brand,
              quantity: item.qty != null ? 0 : item.qty,
              unit: item.unit,
            })),
            is_draft: is_draft,
          },
        ])
        .eq("id", item.id)
        .select();
      data != null
        ? success()
        : Toast.show({
            type: "error",
            text1: error?.message,
          });
      setSubmitting(false);
    }
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    values,
  } = useFormik({
    validationSchema: RecipeSchema,
    initialValues: {
      dish_name: item ? item.name : "",
      description: item ? item.description : "",
      category: {
        value: { id: "", type: "" },
      },
      cuisine: {
        value: { id: "", label: "" },
      },
      preparation: item ? item.preparation_link : "",
      checkboxField: false,
      ingredient: [{ ingredient: "", qty: 0, brand: "", unit: "" }],
      method: item ? item.method : "",
    },
    onSubmit: (value) => {
      values.ingredient.length != 0 &&
        UploadRec(
          value.dish_name,
          value.description,
          value.category.value.type,
          value.cuisine.value.label,
          value.preparation,
          value.method,
          value.ingredient,
          false
        );
    },
  });

  function handleSave(values: any) {
    values.ingredient.length != 0 &&
      UploadRec(
        values.dish_name,
        values.description,
        values.category.value.type,
        values.cuisine.value.label,
        values.preparation,
        values.method,
        values.ingredient,
        true
      );
  }

  return (
    <View style={styles.container}>
      <InfluencerHeader head="Upload Recipe" navigation={navigation} icon />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputs}>
          <TextInput
            placeholder="Dish Name"
            onChangeText={handleChange("dish_name")}
            onBlur={handleBlur("dish_name")}
            error={errors.dish_name}
            touched={touched.dish_name}
            value={values.dish_name}
          />
          <TextInput
            placeholder="Description"
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            error={errors.description}
            touched={touched.description}
            value={values.description}
          />
          {categoryData && (
            <DropData
              data={categoryData}
              placeholder="Select Category"
              onSelect={(e) => {
                setFieldValue("category", e);
              }}
            />
          )}
          {errors.category && touched.category && (
            <Text ms="s" variant="title12black_medium" mt="s" color="error">
              {errors.category.value?.type}
            </Text>
          )}
          {cuisineData && (
            <DropData
              data={cuisineData}
              placeholder="Select Cuisine"
              onSelect={(e) => setFieldValue("cuisine", e)}
            />
          )}
          {errors.cuisine && touched.cuisine && (
            <Text ms="s" variant="title14black_medium" mt="s" color="error">
              {errors.cuisine.value?.label}
            </Text>
          )}
          <View style={styles.line}>
            <ImageUpload
              icon={<Upload />}
              text="Upload Image"
              height={33}
              borderRadius={55}
              backgroundColor={theme.colors.orange}
              onSelect={(e) => setphoto(e)}
              img={item?.image}
            />
            <ImageUpload
              icon={<Upload />}
              text="Upload File"
              height={33}
              borderRadius={55}
              backgroundColor={theme.colors.orange}
              onSelect={(e) => setphoto(e)}
            />
          </View>
          <TextInput
            placeholder="Preparation Link"
            onChangeText={handleChange("preparation")}
            onBlur={handleBlur("preparation")}
            value={values.preparation}
            inlineImageLeft={require("@/Assets/Images/bread.png")}
          />
          {values.ingredient.map(({ ingredient, brand, qty, unit }, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={styles.box}>
                <View style={{ width: "95%" }}>
                  <View style={styles.row}>
                    <View style={styles.inputWrap}>
                      <TextInput
                        style={styles.inputdate}
                        placeholder="Ingredient"
                        onChangeText={handleChange(
                          `ingredient[${index}].ingredient`
                        )}
                        onBlur={handleBlur(`ingredient[${index}].ingredient`)}
                      />
                    </View>
                    <View style={styles.inputWrap}>
                      <TextInput
                        style={styles.inputcvv}
                        placeholder="Brand"
                        onChangeText={handleChange(
                          `ingredient[${index}].brand`
                        )}
                        onBlur={handleBlur(`ingredient[${index}].brand`)}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.inputWrap}>
                      <TextInput
                        style={styles.inputdate}
                        placeholder="Qty"
                        keyboardType="numeric"
                        onChangeText={handleChange(`ingredient[${index}].qty`)}
                        onBlur={handleBlur(`ingredient[${index}].qty`)}
                      />
                    </View>
                    <View style={styles.inputWrap}>
                      <TextInput
                        style={styles.inputcvv}
                        placeholder="Unit"
                        onChangeText={handleChange(`ingredient[${index}].unit`)}
                        onBlur={handleBlur(`ingredient[${index}].unit`)}
                      />
                    </View>
                  </View>
                </View>
                {values.ingredient.length != 1 && (
                  <TouchableOpacity
                    style={styles.close}
                    onPress={() => handleDelete(index)}
                  >
                    <Close width={9} height={9} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
          {values.ingredient.length == 0 && (
            <Text mt="l" variant="title12black_medium" color="error">
              Atleast 1 ingredient is required
            </Text>
          )}
          <TouchableOpacity style={styles.add} onPress={handleAdd}>
            <Text variant="title12black_medium" color="orange">
              +{" "}
              <Text
                variant="title12black_medium"
                color="orange"
                textDecorationLine="underline"
              >
                Add Ingrediant
              </Text>
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Method"
            multiline
            onChangeText={handleChange("method")}
            onBlur={handleBlur("method")}
            textAlignVertical="top"
            placeholderTextColor={theme.colors.grey500}
            style={styles.input}
            value={values.method}
          />
          <Checkbox
            text="I acknowledge that the above information is correct and follows the Terms and Conditions."
            fontSize={12}
            size={15}
            isChecked={values.checkboxField}
            onPress={(isChecked) => setFieldValue("checkboxField", isChecked)}
          />
          {touched.checkboxField && errors.checkboxField && (
            <Text mt="l" variant="title12black_medium" color="error">
              {errors.checkboxField}
            </Text>
          )}
          <TouchableOpacity
            style={styles.save}
            onPress={() => handleSave(values)}
          >
            <Text
              variant="title16black_medium"
              color="orange"
              textDecorationLine="underline"
            >
              Save as Draft
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.savebtn}
            disabled={isSubmitting}
            onPress={handleSubmit as () => void}
          >
            {isSubmitting ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text variant="title16black_semibold" color="white">
                Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  inputs: { marginHorizontal: "7%" },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    height: 33,
    backgroundColor: theme.colors.orange,
    borderRadius: 43,
    paddingHorizontal: "3%",
    marginRight: "5%",
  },
  ingredientsBox: {
    borderColor: theme.colors.grey200,
    borderWidth: 1,
    borderRadius: 20,
  },
  savebtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 30,
    marginTop: "10%",
    marginBottom: "5%",
  },
  line: { flexDirection: "row", alignItems: "center", marginTop: "5%" },
  line2: { flexDirection: "row", alignItems: "center" },
  add: { marginVertical: "5%" },
  save: { marginTop: "5%", alignSelf: "center" },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    borderRadius: 20,
    paddingHorizontal: "5%",
    marginTop: "5%",
    height: 79,
    fontSize: 12,
    fontFamily: "Metropolis-Medium",
    paddingTop: "4%",
  },
  close: { width: 15, height: 15 },
  row: {
    flex: 1,
    flexDirection: "row",
    marginBottom: "5%",
  },
  inputWrap: {
    flex: 1,
    borderColor: theme.colors.grey300,
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: "1%",
  },
  inputdate: {
    fontSize: 12,
    height: 41,
    paddingHorizontal: "10%",
  },
  inputcvv: {
    fontSize: 12,
    height: 41,
    paddingHorizontal: "10%",
  },
  box: {
    borderColor: theme.colors.grey200,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: "6%",
    paddingVertical: "5%",
    paddingHorizontal: "3%",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default UploadRecipe;
