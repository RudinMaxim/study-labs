import { useMemo } from "react";

export type LabStep = {
  text: string;
};

export type LabProblem = {
  id: number;
  title: string;
  steps: LabStep[];
  answer: string;
};

export type Lab2Data = {
  g: number;
  atomicMassUnitKg: number;
  problems: LabProblem[];
};

export function useLab2(): Lab2Data {
  const g = 9.81; // м/с^2
  const u = 1.6605e-27; // кг

  const problems = useMemo<LabProblem[]>(() => {
    return [
      {
        id: 1,
        title: "1) Два шарика m=10 г, стержень l=20 см, ось ⟂ стержню через ЦМ",
        steps: [
          {
            text: "$m = 0{,}01\\,\\mathrm{кг};\\ l = 0{,}2\\,\\mathrm{м};\\ r = l/2 = 0{,}1\\,\\mathrm{м}$",
          },
          { text: "$I = 2 m r^2 = 2 m (l/2)^2 = \\tfrac{1}{2} m l^2$" },
          {
            text: "$I = 0{,}5 \\cdot 0{,}01 \\cdot 0{,}2^2 = 2\\cdot10^{-4}\\, \\mathrm{кг\\cdot м^2}$",
          },
        ],
        answer: "$I = 2 \\cdot 10^{-4}\\, \\mathrm{кг\\cdot м^2}$",
      },
      {
        id: 2,
        title: "2) Шары m и 2m на стержне l=40 см, ось через конец стержня",
        steps: [
          {
            text: "$m = 0{,}01\\,\\mathrm{кг};\\ l = 0{,}4\\,\\mathrm{м};\\ расстояния: l/2,\\ l$",
          },
          { text: "$I = m (l/2)^2 + 2m l^2 = m (2{,}25 l^2)$" },
          {
            text: "$I = 0{,}01 \\cdot 2{,}25 \\cdot 0{,}4^2 = 3{,}6\\cdot10^{-3}\\, \\mathrm{кг\\cdot м^2}$",
          },
        ],
        answer: "$I = 3{,}6 \\cdot 10^{-3}\\, \\mathrm{кг\\cdot м^2}$",
      },
      {
        id: 3,
        title: "3) Шары 2m и m на стержне l=1 м, ось через конец стержня",
        steps: [
          {
            text: "$m = 0{,}02\\,\\mathrm{кг};\\ 2m = 0{,}04\\,\\mathrm{кг};\\ l = 1\\,\\mathrm{м}$",
          },
          { text: "$I = 2m (l/2)^2 + m l^2 = 1{,}5 m l^2$" },
          {
            text: "$I = 1{,}5 \\cdot 0{,}02 \\cdot 1^2 = 0{,}03\\, \\mathrm{кг\\cdot м^2}$",
          },
        ],
        answer: "$I = 0{,}03\\, \\mathrm{кг\\cdot м^2}$",
      },
      {
        id: 4,
        title: "4) Молекула H2O: момент инерции относительно оси y через ЦМ",
        steps: [
          {
            text: "$m_H \\approx 1\\,u,\\ m_O \\approx 16\\,u;\\ d_{HH}=0{,}097\\,\\mathrm{нм};\\ \\alpha=104^\\circ 30'$",
          },
          {
            text: "$r_{OH} = \\dfrac{d}{2 \\sin(\\alpha/2)} \\approx 6{,}15\\cdot10^{-11}\\,\\mathrm{м}$",
          },
          {
            text: "$I_y = \\sum m_i x_i^2;\\ x_H \\approx \\pm 4{,}85\\cdot10^{-11}\\,\\mathrm{м}$",
          },
          {
            text: "$I \\approx 4{,}7\\cdot10^{-21}\\,u\\cdot \\mathrm{м^2} \\Rightarrow 7{,}8\\cdot10^{-48}\\, \\mathrm{кг\\cdot м^2}$",
          },
        ],
        answer: "$I \\approx 7{,}8 \\cdot 10^{-48}\\, \\mathrm{кг\\cdot м^2}$",
      },
      {
        id: 5,
        title: "5) Молекула SO2: момент инерции относительно оси x через ЦМ",
        steps: [
          {
            text: "$m_S=32\\,u,\\ m_O=16\\,u;\\ d_{OO}=0{,}145\\,\\mathrm{нм};\\ \\alpha=124^\\circ$",
          },
          {
            text: "$r_{SO} \\approx 8{,}23\\cdot10^{-11}\\,\\mathrm{м};\\ y_{cm}\\approx 1{,}93\\cdot10^{-11}\\,\\mathrm{м}$",
          },
          { text: "$I_x = m_S y_{cm}^2 + 2 m_O (y_O - y_{cm})^2$" },
          {
            text: "$I \\approx 1{,}6\\cdot10^{-20}\\,u\\cdot \\mathrm{м^2} \\Rightarrow 2{,}7\\cdot10^{-47}\\, \\mathrm{кг\\cdot м^2}$",
          },
        ],
        answer: "$I \\approx 2{,}7 \\cdot 10^{-47}\\, \\mathrm{кг\\cdot м^2}$",
      },
      {
        id: 6,
        title:
          "6) Стержень: ось на l/3 от конца; и стержень l=60 см, ось на a=20 см",
        steps: [
          {
            text: "$Ч.1: l=0{,}3\\,\\mathrm{м},\\ m=0{,}1\\,\\mathrm{кг};\\ a=l/6=0{,}05\\,\\mathrm{м};\\ I_{cm}= m l^2/12$",
          },
          { text: "$I = I_{cm} + m a^2 = 0{,}001\\, \\mathrm{кг\\cdot м^2}$" },
          {
            text: "$Ч.2: l=0{,}6\\,\\mathrm{м},\\ a=0{,}2\\,\\mathrm{м};\\ до\\ ЦМ\\ 0{,}1\\,\\mathrm{м};\\ I=0{,}004\\, \\mathrm{кг\\cdot м^2}$",
          },
        ],
        answer: "$I = 0{,}001;\\ 0{,}004\\, \\mathrm{кг\\cdot м^2}$",
      },
      {
        id: 7,
        title:
          "7) Стержень масса 3m + шарики m и 2m на концах, ось через середину",
        steps: [
          { text: "$I_{ст} = (3m) l^2 / 12 = \\tfrac{1}{4} m l^2$" },
          { text: "$I_{шар} = \\tfrac{1}{4} m l^2 + \\tfrac{1}{2} m l^2$" },
          { text: "$I = m l^2$" },
        ],
        answer: "$I = m l^2$",
      },
      {
        id: 8,
        title: "8) Проволочный прямоугольник a=12 см, b=16 см, ρ_ℓ=0,1 кг/м",
        steps: [
          {
            text: "$m_a=0{,}012\\,\\mathrm{кг},\\ m_b=0{,}016\\,\\mathrm{кг}$",
          },
          { text: "$I_b = 2 m_b (a/2)^2;\\ I_a = 2 (m_a a^2/12)$" },
          { text: "$I = 1{,}44\\cdot10^{-4}\\, \\mathrm{кг\\cdot м^2}$" },
        ],
        answer: "$I = 1{,}44 \\cdot 10^{-4}\\, \\mathrm{кг\\cdot м^2}$",
      },
      {
        id: 9,
        title:
          "9) Проволочный равносторонний треугольник, ось через вершину и середину",
        steps: [
          { text: "Результат в терминах общей массы $m$" },
          { text: "$I = \\dfrac{m a^2}{12}$" },
        ],
        answer: "$I = \\dfrac{m a^2}{12}$",
      },
      {
        id: 10,
        title: "10) Кольцо m=50 г, R=10 см, ось касательная",
        steps: [
          {
            text: "$I_{cm} = m R^2;\\ по \\ Штейнеру: I = I_{cm} + m R^2 = 2 m R^2$",
          },
          {
            text: "$2 \\cdot 0{,}05 \\cdot 0{,}1^2 = 0{,}001\\, \\mathrm{кг\\cdot м^2}$",
          },
        ],
        answer: "$I = 0{,}001\\, \\mathrm{кг\\cdot м^2}$",
      },
      {
        id: 11,
        title:
          "11) Диск d=20 см, m=800 г, ось через середину радиуса, ⟂ плоскости",
        steps: [
          { text: "$R=0{,}1\\,\\mathrm{м};\\ I_{cm} = \\tfrac{1}{2} m R^2$" },
          {
            text: "$I = \\tfrac{1}{2} m R^2 + m (R/2)^2 = \\tfrac{3}{4} m R^2 = 0{,}006$",
          },
        ],
        answer: "$I = 0{,}006\\, \\mathrm{кг\\cdot м^2}$",
      },
      {
        id: 12,
        title: "12) Прямоугольная пластина m=800 г, ось по стороне, a=40 см",
        steps: [
          { text: "$I = \\tfrac{1}{3} m a^2$" },
          { text: "$(1/3) \\cdot 0{,}8 \\cdot 0{,}4^2 \\approx 0{,}0427$" },
        ],
        answer: "$I \\approx 0{,}043\\, \\mathrm{кг\\cdot м^2}$",
      },
      {
        id: 13,
        title:
          "13) Пластина a=10 см, b=20 см, σ=1,2 кг/м^2, ось ∥ большей стороне",
        steps: [
          { text: "$m = \\sigma a b = 0{,}024\\,\\mathrm{кг}$" },
          {
            text: "$I \\approx \\tfrac{1}{12} m (a^2 + b^2) \\approx 1\\cdot10^{-4}\\, \\mathrm{кг\\cdot м^2}$",
          },
        ],
        answer: "$I \\approx 1 \\cdot 10^{-4}\\, \\mathrm{кг\\cdot м^2}$",
      },
      {
        id: 14,
        title:
          "14) Диск m=1 кг, R=30 см с отверстием d=20 см на расстоянии l=15 см",
        steps: [
          {
            text: "$m_{отв} = m (r/R)^2 = 1 \\cdot (0{,}1/0{,}3)^2 \\approx 0{,}111\\,\\mathrm{кг}$",
          },
          { text: "$I_{диск} = 0{,}5 m R^2 = 0{,}045$" },
          {
            text: "$I_{отв} = 0{,}5 m_{отв} r^2 + m_{отв} l^2 \\approx 0{,}00305$",
          },
          { text: "$I = I_{диск} - I_{отв} \\approx 0{,}042$" },
        ],
        answer: "$I \\approx 0{,}042\\, \\mathrm{кг\\cdot м^2}$",
      },
      {
        id: 15,
        title: "15) Цилиндр M,R с намотанной нитью и грузом m: ω(t)?",
        steps: [
          {
            text: "Уравнения: $m g - T = m a;\\ T R = I \\alpha,\\ I= \\tfrac{1}{2} M R^2$",
          },
          {
            text: "$\\alpha = a/R,\\ T = (1/2) M a \\Rightarrow a = \\dfrac{m g}{m + M/2}$",
          },
          { text: "$\\omega(t) = (a/R) t$" },
        ],
        answer: "$\\omega(t) = \\dfrac{m g}{m + M/2} \\cdot \\dfrac{t}{R}$",
      },
      {
        id: 16,
        title: "16) Неподвижный блок-кольцо m=0,2 кг, m1=0,3, m2=0,5: T1, T2",
        steps: [
          { text: "$I = m R^2 \\Rightarrow эффективная масса\\ m$" },
          { text: "$a = \\dfrac{(m_2 - m_1) g}{m_1 + m_2 + m_{блок}}$" },
          {
            text: "Подстановка:$ a \\approx 1{,}962\\, \\mathrm{м/с^2};\\ T_1 \\approx 3{,}53\\,\\mathrm{Н};\\ T_2 \\approx 3{,}92\\,\\mathrm{Н}$",
          },
        ],
        answer:
          "$T_1 \\approx 3{,}53\\,\\mathrm{Н},\\\\ T_2 \\approx 3{,}92\\,\\mathrm{Н}$",
      },
      {
        id: 17,
        title: "17) Блок-диск: m1=0,1 кг, m2=0,11 кг, m_блок=0,4 кг: ускорение",
        steps: [
          {
            text: "$I = (1/2) m_{блок} R^2 \\Rightarrow эффективная масса\\ m_{блок}/2$",
          },
          { text: "$a = \\dfrac{(m_2 - m_1) g}{m_1 + m_2 + m_{блок}/2}$" },
          { text: "Подстановка: $a \\approx 0{,}24\\, \\mathrm{м/с^2}$" },
        ],
        answer: "$a \\approx 0{,}24\\, \\mathrm{м/с^2}$",
      },
      {
        id: 18,
        title: "18) Блок-кольцо с трением на столе: μ=0,2; граммовые массы",
        steps: [
          {
            text: "$m_1=2{,}5\\cdot10^{-4}\\,\\mathrm{кг},\\ m_2=1{,}5\\cdot10^{-4}\\,\\mathrm{кг},\\ m_{бл}=1\\cdot10^{-4}\\,\\mathrm{кг}$",
          },
          {
            text: "$a \\approx \\dfrac{m_2 g - \\mu m_1 g}{m_1 + m_2 + m_{бл}} \\approx 2{,}2\\, \\mathrm{м/с^2}$",
          },
          {
            text: "$T_1 \\approx 1{,}0\\cdot10^{-3}\\,\\mathrm{Н};\\ T_2 \\approx 1{,}1\\cdot10^{-3}\\,\\mathrm{Н}$",
          },
        ],
        answer:
          "$a \\approx 2{,}2\\, \\mathrm{м/с^2},\\\\ T_1 \\approx 1{,}0\\cdot10^{-3}\\,\\mathrm{Н},\\\\ T_2 \\approx 1{,}1\\cdot10^{-3}\\,\\mathrm{Н}$",
      },
      {
        id: 19,
        title:
          "19) Цилиндр на двух нитях, отпущен: время падения y=0,5 м и натяжение",
        steps: [
          {
            text: "$I = (1/2) m R^2;\\ a = \\tfrac{2}{3} g \\approx 6{,}54\\, \\mathrm{м/с^2}$",
          },
          {
            text: "$t = \\sqrt{\\dfrac{2 y}{a}} \\approx 0{,}39\\ , \\mathrm{с}; \\ F  + каждой нити \\approx 1{,}64, \\mathrm{Н}$",
          },
        ],
        answer:
          "$t \\approx 0{,}39\\, \\mathrm{с};\\\\ F \\approx 1{,}64\\, \\mathrm{Н}$",
      },
    ];
  }, []);

  return { g, atomicMassUnitKg: u, problems };
}

export default useLab2;
