public class MainTest {

    public static void main(String[] args) {
        testTask1();
        testTask2();
        testTask3();
        testTask4();
        testTask5();
        System.out.println("=== Все тесты завершены ===");
    }

    private static void printTestResult(boolean success) {
        if (success) {
            System.out.println("\u2713 Тест пройден"); // Галочка
        } else {
            System.out.println("\u2717 Тест не пройден"); // Крестик
        }
    }

    private static void testTask1() {
        System.out.println("=== Тесты для Задания 1: Функции R и L ===");

        // Тест 1: Нормальные значения
        System.out.println("Тест 1.1: Нормальные значения");
        try {
            Main.task1Helper(1.0, 2.0, 1.5, 0.5);
            printTestResult(true);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
            printTestResult(false);
        }

        // Тест 2: Пограничные значения
        System.out.println("Тест 1.2: y + k близко к нулю");
        try {
            Main.task1Helper(0, 0.001, 0, 0.999); // y + k = 1
            printTestResult(true);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
            printTestResult(false);
        }

        // Тест 3: Ошибка ln(y+k) <= 0
        System.out.println("Тест 1.3: Ошибка ln(y+k) <= 0");
        try {
            Main.task1Helper(0, -1, 0, 0); // y + k = -1
            printTestResult(false);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
            printTestResult(true);
        }

        // Тест 4: Отрицательные значения
        System.out.println("Тест 1.4: Отрицательные x, z");
        try {
            Main.task1Helper(-2.0, 1.0, -1.0, 1.0);
            printTestResult(true);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
            printTestResult(false);
        }

        System.out.println();
    }

    private static void testTask2() {
        System.out.println("=== Тесты для Задания 2: Мотоциклист и велосипедист ===");

        // Тест 1: Классический случай
        System.out.println("Тест 2.1: v1=60, v2=20, delay=0.5");
        try {
            Main.task2Helper(60, 20, 0.5);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 2: Большая задержка
        System.out.println("Тест 2.2: Большая задержка");
        try {
            Main.task2Helper(50, 30, 2.0);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 3: Ошибка v2 >= v1
        System.out.println("Тест 2.3: Ошибка v2 >= v1");
        try {
            Main.task2Helper(30, 50, 1);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        // Тест 4: Ошибка отрицательная скорость
        System.out.println("Тест 2.4: Отрицательная скорость");
        try {
            Main.task2Helper(-10, 20, 1);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        // Тест 5: Равные скорости
        System.out.println("Тест 2.5: Равные скорости");
        try {
            Main.task2Helper(40, 40, 1);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        System.out.println();
    }

    private static void testTask3() {
        System.out.println("=== Тесты для Задания 3: Площадь сферы (ИСПРАВЛЕНО) ===");

        // Тест 1: Угол 30°, площадь 100
        System.out.println("Тест 3.1: Угол 30°, S=100");
        try {
            Main.task3Helper(30, 100);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 2: Угол 45°, площадь 200
        System.out.println("Тест 3.2: Угол 45°, S=200");
        try {
            Main.task3Helper(45, 200);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 3: Угол 60°, площадь 150
        System.out.println("Тест 3.3: Угол 60°, S=150");
        try {
            Main.task3Helper(60, 150);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 4: Ошибка угол <= 0
        System.out.println("Тест 3.4: Ошибка угол <= 0");
        try {
            Main.task3Helper(0, 100);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        // Тест 5: Ошибка угол >= 90
        System.out.println("Тест 3.5: Ошибка угол >= 90");
        try {
            Main.task3Helper(90, 100);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        // Тест 6: Ошибка отрицательная площадь
        System.out.println("Тест 3.6: Отрицательная площадь");
        try {
            Main.task3Helper(45, -10);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        System.out.println();
    }

    private static void testTask4() {
        System.out.println("=== Тесты для Задания 4: Арифметическая прогрессия ===");

        // Тест 1: Классическая прогрессия
        System.out.println("Тест 4.1: a1=1, d=2, n=5");
        try {
            Main.task4Helper(1, 2, 5);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 2: Отрицательная разность
        System.out.println("Тест 4.2: a1=10, d=-1, n=3");
        try {
            Main.task4Helper(10, -1, 3);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 3: Дробные значения
        System.out.println("Тест 4.3: a1=1.5, d=0.5, n=4");
        try {
            Main.task4Helper(1.5, 0.5, 4);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 4: Большое количество членов
        System.out.println("Тест 4.4: a1=0, d=3, n=10");
        try {
            Main.task4Helper(0, 3, 10);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 5: Ошибка n <= 0
        System.out.println("Тест 4.5: Ошибка n <= 0");
        try {
            Main.task4Helper(1, 2, 0);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        // Тест 6: Ошибка отрицательное n
        System.out.println("Тест 4.6: Отрицательное n");
        try {
            Main.task4Helper(1, 2, -5);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        System.out.println();
    }

    private static void testTask5() {
        System.out.println("=== Тесты для Задания 5: Проекция точки на прямую ===");

        // Тест 1: Простая прямая x + y - 1 = 0
        System.out.println("Тест 5.1: Точка (2,2), прямая x + y - 1 = 0");
        try {
            Main.task5Helper(2, 2, 1, 1, -1);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 2: Вертикальная прямая x - 3 = 0
        System.out.println("Тест 5.2: Точка (5,4), прямая x - 3 = 0");
        try {
            Main.task5Helper(5, 4, 1, 0, -3);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 3: Горизонтальная прямая y - 2 = 0
        System.out.println("Тест 5.3: Точка (3,5), прямая y - 2 = 0");
        try {
            Main.task5Helper(3, 5, 0, 1, -2);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 4: Отрицательные координаты
        System.out.println("Тест 5.4: Точка (-1,-2), прямая 2x - y + 1 = 0");
        try {
            Main.task5Helper(-1, -2, 2, -1, 1);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 5: Точка на прямой
        System.out.println("Тест 5.5: Точка (1,1), прямая x + y - 2 = 0 (точка на прямой)");
        try {
            Main.task5Helper(1, 1, 1, 1, -2);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 6: Ошибка a = b = 0
        System.out.println("Тест 5.6: Ошибка a = b = 0");
        try {
            Main.task5Helper(1, 1, 0, 0, 1);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        // Тест 7: Малые коэффициенты (близкие к нулю)
        System.out.println("Тест 5.7: Малые коэффициенты");
        try {
            Main.task5Helper(1, 1, 1e-12, 1e-12, 1);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        System.out.println();
    }
}
