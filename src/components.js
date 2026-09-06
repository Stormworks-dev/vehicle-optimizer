export const defaultRotation = "1,0,0,0,1,0,0,0,1";

export const additiveComponents = new Set([
  "additive_block",
  "button_keypad_large",
  "button_lock",
  "button_push",
  "button_push_2side",
  "button_keypad_small",
  "button_throttle_lever",
  "button_toggle",
  "button_toggle_2side",
  "small_light",
  "rotating_light",
  "searchlight",
  "searchlight_small",
  "searchlight_small_2",
  "artificial_horizon",
  "clock",
  "compass",
  "dial",
  "digital_display",
  "gauge_display",
  "indicator",
  "instrument_display",
  "sign",
]);

export const nonRotatingComponents = new Set([
  "01_block_weight",
  "no_sleep",
  "map_icon",
]);

export const defaultRotationRemovableComponents = new Set([
  "01_block_weight",
  "no_sleep",
  "map_icon",
  "multibody_compact_pivot_b",
  //
]);

export const bcPreservedWithScComponents = new Set([
  "test_bc_preserved_component",
  //
]);

export const scRemovableComponents = new Set([
  "test_sc_removable_component",
  //
]);
