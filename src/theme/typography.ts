import metrics from './metrics';

const scaleFont = (size: number) => metrics.scale.font(size);
// FONT FAMILY
export const FONT_FAMILY_BLACK = 'Roboto-Black';
export const FONT_FAMILY_BOLD = 'Roboto-Bold';
export const FONT_FAMILY_EXTRABOLD = 'Roboto-ExtraBold';
export const FONT_FAMILY_EXTRALIGHT = 'Roboto-ExtraLight';
export const FONT_FAMILY_LIGHT = 'Roboto-Light';
export const FONT_FAMILY_MEDIUM = 'Roboto-Medium';
export const FONT_FAMILY_REGULAR = 'Roboto-Regular';
export const FONT_FAMILY_SEMIBOLD = 'Roboto-SemiBold';
export const FONT_FAMILY_THIN = 'Roboto-Thin';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_22 = scaleFont(22);
export const FONT_SIZE_24 = scaleFont(24);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_18 = scaleFont(18);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_REGULAR = {
    fontFamily: FONT_FAMILY_REGULAR,
    fontWeight: FONT_WEIGHT_REGULAR
};
const DEFAULT_FONTSIZE = 14;
const DEFAULT_LINEHEIGHT = 16.94;

const calLineHeight = (fontSize = 14) => {
    // return fontSize;
    return Math.round(fontSize * (DEFAULT_LINEHEIGHT / DEFAULT_FONTSIZE));
};
// label bold
export const LABEL_BOLD_11 = {
    fontSize: scaleFont(11),
    lineHeight: calLineHeight(scaleFont(13.2)),
    letterSpacing: 0.1,
    fontWeight: '600'
};

export const LABEL_BOLD_10 = {
    fontSize: scaleFont(10),
    lineHeight: calLineHeight(scaleFont(12)),
    letterSpacing: 0.1,
    fontWeight: '600'
};

export const LABEL_BOLD_9 = {
    fontSize: scaleFont(9),
    lineHeight: calLineHeight(scaleFont(10.8)),
    letterSpacing: 0.1,
    fontWeight: '600'
};

export const LABEL_BOLD_8 = {
    fontSize: scaleFont(8),
    lineHeight: calLineHeight(scaleFont(9.6)),
    letterSpacing: 0.1,
    fontWeight: '600'
};

export const LABEL_BOLD_7 = {
    fontSize: scaleFont(7),
    lineHeight: calLineHeight(scaleFont(8.4)),
    letterSpacing: 0.1,
    fontWeight: '600'
};
// label regular
export const LABEL_REGULAR_11 = {
    fontSize: scaleFont(11),
    lineHeight: calLineHeight(scaleFont(13.2)),
    letterSpacing: 0.1,
    fontWeight: '400'
};
export const LABEL_REGULAR_10 = {
    fontSize: scaleFont(10),
    lineHeight: calLineHeight(scaleFont(12)),
    letterSpacing: 0.1,
    fontWeight: '400'
};

export const LABEL_REGULAR_9 = {
    fontSize: scaleFont(9),
    lineHeight: calLineHeight(scaleFont(10.8)),
    letterSpacing: 0.1,
    fontWeight: '400'
};

export const LABEL_REGULAR_8 = {
    fontSize: scaleFont(8),
    lineHeight: calLineHeight(scaleFont(9.6)),
    letterSpacing: 0.1,
    fontWeight: '400'
};

export const LABEL_REGULAR_7 = {
    fontSize: scaleFont(7),
    lineHeight: calLineHeight(scaleFont(8.4)),
    letterSpacing: 0.1,
    fontWeight: '400'
};

// title
export const BOLD_LARGE_TITLE = {
    fontSize: scaleFont(32),
    lineHeight: calLineHeight(scaleFont(38)),
    letterSpacing: 0.37,
    fontWeight: '700'
};
export const BOLD_TITLE_1 = {
    fontSize: scaleFont(26),
    lineHeight: calLineHeight(scaleFont(32)),
    fontWeight: '600'
};
export const BOLD_TITLE_2 = {
    fontSize: scaleFont(20),
    lineHeight: calLineHeight(scaleFont(24)),
    letterSpacing: 0.35,
    fontWeight: '600'
};

export const BOLD_TITLE_3 = {
    fontSize: scaleFont(18),
    lineHeight: calLineHeight(scaleFont(20)),
    letterSpacing: 0.38,
    fontWeight: '600'
};

export const BOLD_HEADLINE = {
    fontSize: scaleFont(15),
    lineHeight: calLineHeight(scaleFont(22)),
    fontWeight: '600'
};

export const BOLD_BODY_1 = {
    fontSize: scaleFont(17),
    lineHeight: calLineHeight(scaleFont(25)),
    fontWeight: '600'
};

export const BOLD_BODY_2 = {
    fontSize: scaleFont(15),
    lineHeight: calLineHeight(scaleFont(23)),
    fontWeight: '500'
};

export const BOLD_CALLOUT = {
    fontSize: scaleFont(16),
    fontWeight: '500',
    lineHeight: calLineHeight(scaleFont(21))
};

export const BOLD_SUB_HEADLINE = {
    fontSize: scaleFont(15),
    lineHeight: calLineHeight(scaleFont(20)),
    fontWeight: '500'
};

export const BOLD_FOOT_NOTE = {
    fontSize: scaleFont(13),
    lineHeight: calLineHeight(scaleFont(18)),
    letterSpacing: -0.08,
    fontWeight: '600'
};

export const BOLD_CAPTION_1 = {
    fontSize: scaleFont(13),
    lineHeight: calLineHeight(scaleFont(18)),
    fontWeight: '500'
};
export const BOLD_CAPTION_2 = {
    fontSize: scaleFont(12),
    lineHeight: calLineHeight(scaleFont(18)),
    letterSpacing: 0.06,
    fontWeight: '500'
};
export const REGULAR_LARGE_TITLE = {
    fontSize: scaleFont(32),
    lineHeight: calLineHeight(scaleFont(38)),
    letterSpacing: 0.01,
    fontWeight: '400'
};
export const REGULAR_TITLE_1 = {
    fontSize: scaleFont(26),
    lineHeight: calLineHeight(scaleFont(32)),
    letterSpacing: 0.01,
    fontWeight: '400'
};
export const REGULAR_TITLE_2 = {
    fontSize: scaleFont(20),
    lineHeight: calLineHeight(scaleFont(24)),
    letterSpacing: 0.01,
    fontWeight: '400'
};
export const REGULAR_TITLE_3 = {
    fontSize: scaleFont(18),
    lineHeight: calLineHeight(scaleFont(22)),
    fontWeight: '400'
};
export const SUB_TITLE_2 = {
    fontSize: scaleFont(14),
    lineHeight: calLineHeight(scaleFont(19.6)),
    fontWeight: '700',
    letterSpacing: 0.01
};
export const REGULAR_HEADLINE = {
    fontSize: scaleFont(17),
    lineHeight: calLineHeight(scaleFont(22)),
    fontWeight: '400'
};
export const REGULAR_BODY = {
    fontSize: scaleFont(17),
    lineHeight: calLineHeight(scaleFont(22)),
    letterSpacing: -0.41,
    fontWeight: '400'
};
export const REGULAR_BODY_1 = {
    fontSize: scaleFont(17),
    lineHeight: calLineHeight(scaleFont(25)),
    letterSpacing: 0.01,
    fontWeight: '400'
};
export const REGULAR_BODY_2 = {
    fontSize: scaleFont(15),
    lineHeight: calLineHeight(scaleFont(23)),
    letterSpacing: 0.01,
    fontWeight: '400'
};
export const REGULAR_CALLOUT = {
    fontSize: scaleFont(16),
    lineHeight: calLineHeight(scaleFont(21)),
    fontWeight: '400'
};
export const REGULAR_SUB_HEADLINE = {
    fontSize: scaleFont(15),
    lineHeight: calLineHeight(scaleFont(20)),
    letterSpacing: 0.01,
    fontWeight: '400'
};
export const REGULAR_FOOTNOTE = {
    fontSize: scaleFont(13),
    lineHeight: calLineHeight(scaleFont(18)),
    letterSpacing: 0.01,
    fontWeight: '400'
};
export const REGULAR_CAPTION_1 = {
    fontSize: scaleFont(13),
    lineHeight: calLineHeight(scaleFont(18)),
    letterSpacing: 0.01,
    fontWeight: '400'
};
export const REGULAR_CAPTION_2 = {
    fontSize: scaleFont(12),
    lineHeight: calLineHeight(scaleFont(18)),
    letterSpacing: 0.01,
    fontWeight: '400'
};
export const REGULAR = {
    fontSize: scaleFont(14),
    lineHeight: calLineHeight(scaleFont(18)),
    letterSpacing: -0.5,
    fontWeight: '400'
};
