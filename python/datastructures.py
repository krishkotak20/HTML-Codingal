pasta = ("pasta arrabiata","italian",20,("spicy","veg"))
biriyani = ("chicken biriyani","indian",45,("spicy","non veg"))

print("recipe 1:", pasta)
print("name:", pasta[0])
print("cuisine:", pasta[1])
print("difficulty:", pasta[-1])

all_recipes = (pasta, biriyani)
print("\nFirst recipe name:", all_recipes[0][0])
print("second recipe time:", all_recipes[1][2], "mins")
print("pasta details (sliced):", pasta[1:3])

print("\nPasta recipe details")
for detail in pasta:
    print(" -",detail)
 
pasta_ingredients = {"tomato", "garlic", "olive oil", "chilli", "pasta", "garlic",}
biriyani_ingredients = {"rice", "chicken", "garlic", "onion", "tomato", "spices",}

print("\nPasta ingredients:", pasta_ingredients)
print("biriyani ingredients:", biriyani_ingredients)
print("total pasta ingredients:", len(pasta_ingredients))

pasta_ingredients.add("parmesean")
pasta_ingredients.discard("chilli")
print("\nUpdated pasta ingredients:", pasta_ingredients)


all_ingredients = pasta_ingredients.union(biriyani_ingredients)
commmon = pasta_ingredients.intersection(biriyani_ingredients)
only_pasta = pasta_ingredients.difference(biriyani_ingredients)
unique_to_each = pasta_ingredients.symmetric_difference(biriyani_ingredients)

print("\nAll ingredients (union):", all_ingredients)
print("common ingredients (intersection):", commmon)
print("only in pasta (difference):", only_pasta)
print("not shared (sym. difference):", unique_to_each)