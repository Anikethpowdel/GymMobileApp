import {ScrollView, StyleSheet, View} from 'react-native';
import {ThemedView} from '@/components/ThemedView';

type Props= {
    backgroundColor? : string;
    children: React.ReactNode;
    headerContent: React.ReactNode;
};

export default function ModifiedScrollView({children, headerContent, backgroundColor}: Props){
    return (
        <ThemedView style={[styles.container, { backgroundColor: backgroundColor || 'transparent' }]}>
            <ScrollView>
                <ThemedView style={[styles.header, { backgroundColor: backgroundColor || 'transparent' }]}>
                    {headerContent}
                </ThemedView>
                <ThemedView style={[styles.content, { backgroundColor: backgroundColor || 'transparent' }]}>
                    {children}
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        // height: 250,
      },
      content: {
        flex: 1,
        padding: 20,
      },
})