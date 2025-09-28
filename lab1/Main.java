
import java.util.Scanner;

public class Main {

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("=== РЕШЕНИЕ МАТЕМАТИЧЕСКИХ ЗАДАЧ ===\n");

        while (true) {
            System.out.println("1. Вычисление функций R и L");
            System.out.println("2. Задача о мотоциклисте и велосипедисте");
            System.out.println("3. Площадь поверхности сферы");
            System.out.println("4. Арифметическая прогрессия");
            System.out.println("5. Проекция точки на прямую");
            System.out.println("0. Выход\n");

            int choice = readInt("Выбор: ");
            System.out.println();

            try {
                switch (choice) {
                    case 1 ->
                        task1();
                    case 2 ->
                        task2();
                    case 3 ->
                        task3();
                    case 4 ->
                        task4();
                    case 5 ->
                        task5();
                    case 0 -> {
                        return;
                    }
                    default ->
                        System.out.println("Неверный выбор\n");
                }
            } catch (Exception e) {
                System.out.println("Ошибка: " + e.getMessage() + "\n");
            }
        }
    }

    // Задание 1: Вычисление функций
    private static void task1() {
        System.out.println("=== ЗАДАНИЕ 1: Вычисление функций ===");

        double x = readDouble("x = ");
        double y = readDouble("y = ");
        double z = readDouble("z = ");
        double k = readDouble("k = ");

        if (y + k <= 0) {
            throw new RuntimeException("ln(y+k): y+k должно быть > 0");
        }

        double numeratorR = Math.sqrt(Math.pow(Math.sin(y), 2) + 6.835);
        double denominatorR = Math.log(y + k) + 3 * Math.pow(y, 2);
        if (Math.abs(denominatorR) < 1e-10) {
            throw new RuntimeException("Деление на ноль в R");
        }

        double R = numeratorR / denominatorR;

        double term1 = Math.pow(10, 7);
        double term2 = Math.pow(y - x, 2) / 2.0 - Math.pow(x - y, 2) / 3.0;
        double denominatorL = Math.cos(x) + Math.sin(z) + 5 * y + 10;
        if (Math.abs(denominatorL) < 1e-10) {
            throw new RuntimeException("Деление на ноль в L");
        }

        double L = term1 + term2 / denominatorL;

        System.out.printf("R = %.6f\n", R);
        System.out.printf("L = %.6f\n\n", L);
    }

    // Задание 2: Физическая задача
    private static void task2() {
        System.out.println("=== ЗАДАНИЕ 2: Мотоциклист и велосипедист ===");

        double v1 = readDouble("Скорость мотоциклиста (км/ч): ");
        double v2 = readDouble("Скорость велосипедиста (км/ч): ");
        double delay = readDouble("Задержка велосипедиста (ч): ");

        if (v1 <= 0 || v2 <= 0) {
            throw new RuntimeException("Скорости должны быть > 0");
        }
        if (v2 >= v1) {
            throw new RuntimeException("Скорость велосипедиста должна быть меньше");
        }

        double meetingTime = (v1 * delay) / (v1 - v2);
        double distance = v1 * (meetingTime + delay);

        System.out.printf("Расстояние до поселка: %.2f км\n\n", distance);
    }

    // Задание 3: Геометрия
    private static void task3() {
        System.out.println("=== ЗАДАНИЕ 3: Площадь сферы, вписанной в конус ===");

        double angle = readDouble("Угол между осью и образующей конуса (градусы): ");
        double lateralArea = readDouble("Площадь боковой поверхности конуса: ");

        if (angle <= 0 || angle >= 90) {
            throw new RuntimeException("Угол должен быть 0 < угол < 90");
        }
        if (lateralArea <= 0) {
            throw new RuntimeException("Площадь должна быть > 0");
        }

        double angleRad = Math.toRadians(angle);
        double radius = Math.sqrt(lateralArea * Math.sin(angleRad) / (Math.PI * (1 + Math.cos(angleRad))));
        double sphereArea = 4 * Math.PI * Math.pow(radius, 2);

        System.out.printf("Радиус вписанной сферы: %.4f\n", radius);
        System.out.printf("Площадь поверхности сферы: %.4f\n\n", sphereArea);
    }

    // Задание 4: Арифметическая прогрессия
    private static void task4() {
        System.out.println("=== ЗАДАНИЕ 4: Арифметическая прогрессия ===");

        double a1 = readDouble("Первый член: ");
        double d = readDouble("Разность: ");
        int n = readInt("Количество членов для суммы: ");

        if (n <= 0) {
            throw new RuntimeException("Количество членов должно быть > 0");
        }

        double a5 = a1 + 4 * d;
        double sum = n * (2 * a1 + (n - 1) * d) / 2.0;

        System.out.printf("Пятый член: %.4f\n", a5);
        System.out.printf("Сумма первых %d членов: %.4f\n\n", n, sum);
    }

    // Задание 5: Проекция точки на прямую
    private static void task5() {
        System.out.println("=== ЗАДАНИЕ 5: Проекция точки ===");

        double x0 = readDouble("Координата точки x: ");
        double y0 = readDouble("Координата точки y: ");

        System.out.println("Коэффициенты прямой ax + by + c = 0:");
        double a = readDouble("a = ");
        double b = readDouble("b = ");
        double c = readDouble("c = ");

        if (Math.abs(a) < 1e-10 && Math.abs(b) < 1e-10) {
            throw new RuntimeException("a и b не могут быть одновременно равны 0");
        }

        double denominator = a * a + b * b;
        double projX = (b * (b * x0 - a * y0) - a * c) / denominator;
        double projY = (a * (-b * x0 + a * y0) - b * c) / denominator;

        System.out.printf("Исходная точка: (%.2f, %.2f)\n", x0, y0);
        System.out.printf("Проекция: (%.2f, %.2f)\n\n", projX, projY);
    }

    private static double readDouble(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextDouble()) {
            System.out.println("Введите число");
            scanner.next();
            System.out.print(prompt);
        }
        return scanner.nextDouble();
    }

    private static int readInt(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextInt()) {
            System.out.println("Введите целое число");
            scanner.next();
            System.out.print(prompt);
        }
        return scanner.nextInt();
    }

    public static void task1Helper(double x, double y, double z, double k) {
        if (y + k <= 0) {
            throw new RuntimeException("ln(y+k): y+k должно быть > 0");
        }

        double numeratorR = Math.sqrt(Math.pow(Math.sin(y), 2) + 6.835);
        double denominatorR = Math.log(y + k) + 3 * Math.pow(y, 2);
        if (Math.abs(denominatorR) < 1e-10) {
            throw new RuntimeException("Деление на ноль в R");
        }

        double R = numeratorR / denominatorR;

        double term1 = Math.pow(10, 7);
        double term2 = Math.pow(y - x, 2) / 2.0 - Math.pow(x - y, 2) / 3.0;
        double denominatorL = Math.cos(x) + Math.sin(z) + 5 * y + 10;
        if (Math.abs(denominatorL) < 1e-10) {
            throw new RuntimeException("Деление на ноль в L");
        }

        double L = term1 + term2 / denominatorL;

        System.out.printf("R = %.6f\n", R);
        System.out.printf("L = %.6f\n\n", L);
    }

    public static void task2Helper(double v1, double v2, double delay) {
        if (v1 <= 0 || v2 <= 0) {
            throw new RuntimeException("Скорости должны быть > 0");
        }
        if (v2 >= v1) {
            throw new RuntimeException("Скорость велосипедиста должна быть меньше");
        }

        double meetingTime = (v1 * delay) / (v1 - v2);
        double distance = v1 * (meetingTime + delay);

        System.out.printf("Расстояние до поселка: %.2f км\n\n", distance);
    }

    public static void task3Helper(double angle, double lateralArea) {
        if (angle <= 0 || angle >= 90) {
            throw new RuntimeException("Угол должен быть 0 < угол < 90");
        }
        if (lateralArea <= 0) {
            throw new RuntimeException("Площадь должна быть > 0");
        }

        double angleRad = Math.toRadians(angle);
        double radius = Math.sqrt(lateralArea * Math.sin(angleRad) / (Math.PI * (1 + Math.cos(angleRad))));
        double sphereArea = 4 * Math.PI * Math.pow(radius, 2);

        System.out.printf("Радиус вписанной сферы: %.4f\n", radius);
        System.out.printf("Площадь поверхности сферы: %.4f\n\n", sphereArea);
    }

    public static void task4Helper(double a1, double d, int n) {
        if (n <= 0) {
            throw new RuntimeException("Количество членов должно быть > 0");
        }

        double a5 = a1 + 4 * d;
        double sum = n * (2 * a1 + (n - 1) * d) / 2.0;

        System.out.printf("Пятый член: %.4f\n", a5);
        System.out.printf("Сумма первых %d членов: %.4f\n\n", n, sum);
    }

    public static void task5Helper(double x0, double y0, double a, double b, double c) {
        if (Math.abs(a) < 1e-10 && Math.abs(b) < 1e-10) {
            throw new RuntimeException("a и b не могут быть одновременно равны 0");
        }

        double denominator = a * a + b * b;
        double projX = (b * (b * x0 - a * y0) - a * c) / denominator;
        double projY = (a * (-b * x0 + a * y0) - b * c) / denominator;

        System.out.printf("Исходная точка: (%.2f, %.2f)\n", x0, y0);
        System.out.printf("Проекция: (%.2f, %.2f)\n\n", projX, projY);
    }
}
