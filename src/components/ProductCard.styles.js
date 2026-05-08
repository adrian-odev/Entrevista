import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },
  imageWrapper: {
    width: 88,
    height: 88,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  image: {
    width: 58,
    height: 58,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  category: {
    alignSelf: 'flex-start',
    color: '#7c3aed',
    backgroundColor: '#f3e8ff',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 22,
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563eb',
  },
  ctaPill: {
    backgroundColor: '#eff6ff',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ctaText: {
    color: '#1d4ed8',
    fontSize: 12,
    fontWeight: '700',
  },
});
