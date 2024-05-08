import {
    trigger,
    style,
    animate,
    transition,
    state
  } from "@angular/animations";
  
  export const fade = [
    trigger("fade", [
      state("in", style({ opacity: "1" })),
      state("out", style({ opacity: "0" })),
      transition("in => out", animate("1s 1s")),
      transition("out => in", animate("1s 0.5s"))
    ])
  ];
  
  export enum AnimationState {
    IN = "in",
    OUT = "out"
  }
  