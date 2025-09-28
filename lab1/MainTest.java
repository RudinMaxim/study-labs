public class MainTest {
    public static void main(String[] args) {
        testTask1();
        testTask2();
        testTask3();
        testTask4();
        testTask5();
    }

    private static void testTask1() {
        System.out.println("=== Тесты для Задания 1 ===");
        try {
            // Пограничные значения
            Main.task1Helper(0, 1, 0, 1); // y + k > 0
            Main.task1Helper(1, 1, 1, 1); // Общий случай
            
            // Отрицательные значения
            try {
                Main.task1Helper(0, -1, 0, 0); // y + k <= 0
            } catch (RuntimeException e) {
                System.out.println("Ожидаемая ошибка: " + e.getMessage());
            }
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    private static void testTask2() {
        System.out.println("=== Тесты для Задания 2 ===");
        try {
            // Положительные значения
            Main.task2Helper(60, 20, 0.5); // Общий случай

            // Пограничные значения
            try {
                Main.task2Helper(20, 20, 1); // v2 >= v1
            } catch (RuntimeException e) {
                System.out.println("Ожидаемая ошибка: " + e.getMessage());
            }

            try {
                Main.task2Helper(-10, 20, 1); // v1 <= 0
            } catch (RuntimeException e) {
                System.out.println("Ожидаемая ошибка: " + e.getMessage());
            }
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    private static void testTask3() {
        System.out.println("=== Тесты для Задания 3 ===");
        try {
            // Положительные значения
            Main.task3Helper(45, 100); // Общий случай

            // Пограничные значения
            try {
                Main.task3Helper(0, 100); // Угол <= 0
            } catch (RuntimeException e) {
                System.out.println("Ожидаемая ошибка: " + e.getMessage());
            }

            try {
                Main.task3Helper(45, -10); // Площадь <= 0
            } catch (RuntimeException e) {
                System.out.println("Ожидаемая ошибка: " + e.getMessage());
            }
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    private static void testTask4() {
        System.out.println("=== Тесты для Задания 4 ===");
        try {
            // Положительные значения
            Main.task4Helper(1, 2, 5); // Общий случай

            // Пограничные значения
            try {
                Main.task4Helper(1, 2, 0); // n <= 0
            } catch (RuntimeException e) {
                System.out.println("Ожидаемая ошибка: " + e.getMessage());
            }
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    private static void testTask5() {
        System.out.println("=== Тесты для Задания 5 ===");
        try {
            // Положительные значения
            Main.task5Helper(1, 1, 1, 1, 1); // Общий случай

            // Пограничные значения
            try {
                Main.task5Helper(1, 1, 0, 0, 0); // a и b равны 0
            } catch (RuntimeException e) {
                System.out.println("Ожидаемая ошибка: " + e.getMessage());
            }
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }
}