#Programmatic_SupportResistance_WickZoneMod
declare upper;

input LookbackPeriod = 5;
input HideCurrentTF = no;
input HideTimeFrame2 = no;
input HideTimeFrame3 = no;
input TimeFrame2 = {default "15 MIN", "1 MIN", "2 MIN", "3 MIN", "4 MIN", "5 MIN", "10 MIN", "20 MIN", "30 MIN", "1 HOUR", "2 HOURS", "4 HOURS", DAY, "2 DAYS", "3 DAYS", "4 DAYS", WEEK, MONTH, "OPT EXP"};
input TimeFrame3 = {"30 MIN", "1 MIN", "2 MIN", "3 MIN", "4 MIN", "5 MIN", "10 MIN", "15 MIN", "20 MIN",default "1 HOUR", "2 HOURS", "4 HOURS", DAY, "2 DAYS", "3 DAYS", "4 DAYS", WEEK, MONTH, "OPT EXP"};
input HideSwings = no;
input SwingsLagBar = 1;

#--------------------------------------------------------------
def _highInPeriod1 = Highest(high, LookbackPeriod);
def _lowInPeriod1 = Lowest(low, LookbackPeriod);
#--------------------------------------------------------------
def marketLow1 = if _lowInPeriod1 < _lowInPeriod1[-LookbackPeriod] then _lowInPeriod1 else _lowInPeriod1[-LookbackPeriod];
def _markedLow1 = low == marketLow1;

rec _lastMarkedLow1 = CompoundValue(1, if IsNaN(_markedLow1) then _lastMarkedLow1[1] else if _markedLow1 then low else _lastMarkedLow1[1], low);
rec _lastMarkedLow11 = CompoundValue(1, if IsNaN(_markedLow1) then _lastMarkedLow11[1] else if _markedLow1 then Min(open, close) else _lastMarkedLow11[1], low);
#--------------------------------------------------------------
def marketHigh1 = if _highInPeriod1 > _highInPeriod1[-LookbackPeriod] then _highInPeriod1 else _highInPeriod1[-LookbackPeriod];
def _markedHigh1 = high == marketHigh1;

rec _lastMarkedHigh1 = CompoundValue(1, if IsNaN(_markedHigh1) then _lastMarkedHigh1[1] else if _markedHigh1 then high else _lastMarkedHigh1[1], high);
rec _lastMarkedHigh11 = CompoundValue(1, if IsNaN(_markedHigh1) then _lastMarkedHigh11[1] else if _markedHigh1 then Max(open, close) else _lastMarkedHigh11[1], high);
#--------------------------------------------------------------
plot Resistance1 = _lastMarkedHigh1;
plot Resistance11 = _lastMarkedHigh11;
plot Support1 = _lastMarkedLow1;
plot Support11 = _lastMarkedLow11;
#--------------------------------------------------------------
Resistance11.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Resistance11.SetDefaultColor(Color.MAGENTA);
Resistance11.SetHiding(HideCurrentTF);
Resistance1.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Resistance1.SetDefaultColor(Color.MAGENTA);
Resistance1.SetHiding(HideCurrentTF);
AddCloud(Resistance1, Resistance11, Color.MAGENTA, Color.MAGENTA);
#--------------------------------------------------------------
Support1.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Support1.SetDefaultColor(Color.YELLOW);
Support1.SetHiding(HideCurrentTF);
Support11.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Support11.SetDefaultColor(Color.YELLOW);
Support11.SetHiding(HideCurrentTF);
AddCloud(Support1, Support11, Color.YELLOW, Color.YELLOW);

#--------------------------------------------------------------
def LowSwingForw = Lowest(low, SwingsLagBar)[-SwingsLagBar];
def LowSwingBack = Lowest(low, LookbackPeriod)[1];
def SwingLow = if low < LowSwingForw and low <= LowSwingBack then 1 else 0;
plot LowSwing = if SwingLow then low else Double.NaN;
LowSwing.Hide();
#--------------------------------------------------------------
def HighSwingForw = Highest(high, SwingsLagBar)[-SwingsLagBar];
def HighSwingBack = Highest(high, LookbackPeriod)[1];
def SwingHigh = if high > HighSwingForw and high >= HighSwingBack then 1 else 0;
plot HighSwing = if SwingHigh then high else Double.NaN;
HighSwing.Hide();
#--------------------------------------------------------------
HighSwing.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
HighSwing.SetLineWeight(5);
HighSwing.SetDefaultColor(Color.MAGENTA);
HighSwing.SetHiding(HideSwings);
LowSwing.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
LowSwing.SetLineWeight(5);
LowSwing.SetDefaultColor(Color.YELLOW);
LowSwing.SetHiding(HideSwings);
#--------------------------------------------------------------
Alert(HighSwing, "SupRes : Swing High", Alert.BAR, Sound.Bell);
Alert(LowSwing, "SupRes : Swing Low", Alert.BAR, Sound.Bell);
#--------------------------------------------------------------
AddLabel(HighSwing, "SupRes : Swing High", Color.MAGENTA);
AddLabel(LowSwing, "SupRes : Swing Low", Color.YELLOW);
#--------------------------------------------------------------
def _highInPeriod2 = Highest(high(period = TimeFrame2), LookbackPeriod);
def _lowInPeriod2 = Lowest(low(period = TimeFrame2), LookbackPeriod);
#--------------------------------------------------------------
def marketLow2 = if _lowInPeriod2 < _lowInPeriod2[-LookbackPeriod] then _lowInPeriod2 else _lowInPeriod2[-LookbackPeriod];
def _markedLow2 = low(period = TimeFrame2) == marketLow2;

rec _lastMarkedLow2 = CompoundValue(1, if IsNaN(_markedLow2) then _lastMarkedLow2[1] else if _markedLow2 then low(period = TimeFrame2) else _lastMarkedLow2[1], low(period = TimeFrame2));
rec _lastMarkedLow22 = CompoundValue(1, if IsNaN(_markedLow2) then _lastMarkedLow22[1] else if _markedLow2 then Min(open, close(period = TimeFrame2)) else _lastMarkedLow22[1], low(period = TimeFrame2));
#--------------------------------------------------------------
def marketHigh2 = if _highInPeriod2 > _highInPeriod2[-LookbackPeriod] then _highInPeriod2 else _highInPeriod2[-LookbackPeriod];
def _markedHigh2 = high(period = TimeFrame2) == marketHigh2;

rec _lastMarkedHigh2 = CompoundValue(1, if IsNaN(_markedHigh2) then _lastMarkedHigh2[1] else if _markedHigh2 then high(period = TimeFrame2) else _lastMarkedHigh2[1], high(period = TimeFrame2));
rec _lastMarkedHigh22 = CompoundValue(1, if IsNaN(_markedHigh2) then _lastMarkedHigh22[1] else if _markedHigh2 then Max(open, close(period = TimeFrame2)) else _lastMarkedHigh22[1], high(period = TimeFrame2));
#--------------------------------------------------------------
plot Resistance2 = _lastMarkedHigh2;
plot Resistance22 = _lastMarkedHigh22;
plot Support2 = _lastMarkedLow2;
plot Support22 = _lastMarkedLow22;
#--------------------------------------------------------------
Resistance2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Resistance2.SetDefaultColor(Color.PINK);
Resistance2.SetHiding(HideTimeFrame2);
Resistance22.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Resistance22.SetDefaultColor(Color.PINK);
Resistance22.SetHiding(HideTimeFrame2);
AddCloud(Resistance2, Resistance22, Color.PINK, Color.PINK);
#--------------------------------------------------------------
Support2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Support2.SetDefaultColor(Color.ORANGE);
Support2.SetHiding(HideTimeFrame2);
Support22.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Support22.SetDefaultColor(Color.ORANGE);
Support22.SetHiding(HideTimeFrame2);
AddCloud(Support2, Support22, Color.ORANGE, Color.ORANGE);
#--------------------------------------------------------------
def _highInPeriod3 = Highest(high(period = TimeFrame3), LookbackPeriod);
def _lowInPeriod3 = Lowest(low(period = TimeFrame3), LookbackPeriod);
#--------------------------------------------------------------
def marketLow3 = if _lowInPeriod3 < _lowInPeriod3[-LookbackPeriod] then _lowInPeriod3 else _lowInPeriod3[-LookbackPeriod];
def _markedLow3 = low(period = TimeFrame3) == marketLow3;

rec _lastMarkedLow3 = CompoundValue(1, if IsNaN(_markedLow3) then _lastMarkedLow3[1] else if _markedLow3 then low(period = TimeFrame3) else _lastMarkedLow3[1], low(period = TimeFrame3));
rec _lastMarkedLow33 = CompoundValue(1, if IsNaN(_markedLow3) then _lastMarkedLow33[1] else if _markedLow3 then Min(open, close(period = TimeFrame3)) else _lastMarkedLow33[1], low(period = TimeFrame3));
#--------------------------------------------------------------
def marketHigh3 = if _highInPeriod3 > _highInPeriod3[-LookbackPeriod] then _highInPeriod3 else _highInPeriod3[-LookbackPeriod];
def _markedHigh3 = high(period = TimeFrame3) == marketHigh3;

rec _lastMarkedHigh3 = CompoundValue(1, if IsNaN(_markedHigh3) then _lastMarkedHigh3[1] else if _markedHigh3 then high(period = TimeFrame3) else _lastMarkedHigh3[1], high(period = TimeFrame3));
rec _lastMarkedHigh33 = CompoundValue(1, if IsNaN(_markedHigh3) then _lastMarkedHigh33[1] else if _markedHigh3 then  Max(open, close(period = TimeFrame3)) else _lastMarkedHigh33[1], high(period = TimeFrame3));
#--------------------------------------------------------------
plot Resistance3 = _lastMarkedHigh3;
plot Resistance33 = _lastMarkedHigh33;
plot Support3 = _lastMarkedLow3;
plot Support33 = _lastMarkedLow33;
#--------------------------------------------------------------
Resistance3.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Resistance3.SetDefaultColor(Color.PLUM);
Resistance3.SetHiding(HideTimeFrame3);
Resistance33.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Resistance33.SetDefaultColor(Color.PLUM);
Resistance33.SetHiding(HideTimeFrame3);
AddCloud(Resistance3, Resistance33, Color.PLUM, Color.PLUM);
#--------------------------------------------------------------
Support3.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Support3.SetDefaultColor(Color.DARK_ORANGE);
Support3.SetHiding(HideTimeFrame3);
Support33.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Support33.SetDefaultColor(Color.DARK_ORANGE);
Support33.SetHiding(HideTimeFrame3);
AddCloud(Support3, Support33, Color.DARK_ORANGE, Color.DARK_ORANGE);
