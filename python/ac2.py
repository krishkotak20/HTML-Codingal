def add(x, y):
    return x + y
def subtract(x, y):
    return x - y
def multiply(x, y):
    return x * y
def divide(x, y):
    return x / y

num1 = int(input("enter number 1 =" ))
num2 = int(input("enter number 2 =" ))

print("sum :",num1,"+",num2,"=", add(num1, num2))
print("difference :",num1,"-",num2,"=", subtract(num1, num2))
print("product :",num1,"*",num2,"=", multiply(num1, num2))
print("quotient :",num1,"/",num2,"=", divide(num1, num2))