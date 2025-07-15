import React, { useState, useCallback, useRef, useEffect } from 'react';

// --- Helper UI Components ---

const SettingsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-cyan-400"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.4l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.4l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>);
const CodeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-cyan-400"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>);
const ClipboardIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>);
const SaveIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>);
const UploadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>);
const ResetIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M3 2v6h6" /><path d="M21 12A9 9 0 0 0 6 5.3L3 8" /><path d="M21 22v-6h-6" /><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" /></svg>);
const AddIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>);
const TrashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>);


const Section = ({ title, icon, children }) => (
    <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700/50 h-full flex flex-col">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 border-b border-gray-600/50 pb-2 flex items-center">
            {icon}{title}
        </h3>
        <div className="space-y-4 flex-grow">{children}</div>
    </div>
);

const Checkbox = ({ label, checked, onChange, helpText }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
        <div className="relative">
            <input type="checkbox" checked={Boolean(checked)} onChange={onChange} className="sr-only" />
            <div className={`w-10 h-4 rounded-full shadow-inner transition-colors duration-300 ${checked ? 'bg-cyan-500' : 'bg-gray-600'}`}></div>
            <div className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform duration-300 ${checked ? 'transform translate-x-full border-cyan-500' : 'border-gray-400'} border-2`}></div>
        </div>
        <div className="flex flex-col">
            <span className="text-gray-200 group-hover:text-white text-sm">{label}</span>
            {helpText && <span className="text-xs text-gray-400">{helpText}</span>}
        </div>
    </label>
);

const NumberInput = ({ label, value, onChange, step = 1, min = 0, max, format = "int", helpText }) => (
    <label className="block">
        <span className="text-gray-300 mb-1 block text-sm">{label}</span>
        <input
            type="number"
            value={value}
            onChange={(e) => {
                const val = format === 'float' ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
                onChange({ target: { value: isNaN(val) ? '' : val } });
            }}
            step={step}
            min={min}
            max={max}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        />
        {helpText && <span className="text-xs text-gray-500 mt-1 block">{helpText}</span>}
    </label>
);

const TextInput = ({ label, value, onChange, helpText }) => (
    <label className="block">
        <span className="text-gray-300 mb-1 block text-sm">{label}</span>
        <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        />
        {helpText && <span className="text-xs text-gray-500 mt-1 block">{helpText}</span>}
    </label>
);

const RadioGroup = ({ label, name, options, selectedValue, onChange }) => (
    <div className="space-y-1">
        <span className="text-gray-300 font-semibold text-sm">{label}</span>
        {options.map(option => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-800/60 transition-colors">
                <input type="radio" name={name} value={option.value} checked={selectedValue === option.value} onChange={onChange} className="sr-only" />
                <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex-shrink-0 flex items-center justify-center group-hover:border-cyan-400 transition">
                    {selectedValue === option.value && <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>}
                </div>
                <span className="text-gray-200 group-hover:text-white text-sm">{option.label}</span>
            </label>
        ))}
    </div>
);

// Main Application Component
export default function App() {
    const ALL_AVAILABLE_CLASSES = ['asthma', 'bronchitis', 'copd', 'dyspnea', 'healthy', 'ipf', 'lung_cancer', 'pleural_effusion', 'pneumonia'];
    
    const getInitialParams = () => ({
        "FEATURE_SET_VERSION": 'v150_gui_final_en',
        "SAVE_BEST_MODELS": true,
        "CREATE_PDF_REPORT": true,
        "USE_SPECTROGRAM": true,
        "USE_MFCC": false,
        "USE_DELTA_FEATURES": true,
        "USE_DELTA_DELTA_FEATURES": true,
        "PRE_TRAINED_MODELS_CONFIG": { "USE_YAMNET": false, "USE_VGGISH": false },
        "CHUNK_DURATION_MS": 400,
        "SLIDING_WINDOW_CONFIG": { "USE_SLIDING_WINDOW": false, "OVERLAP_PERCENTAGE": 0.5 },
        "SR": 16000, "N_FFT": 1024, "HOP_LENGTH": 256, "N_MELS": 64, "N_MFCC": 20,
        "APPLY_OVERSAMPLING": false,
        "OFFLINE_AUGMENTATION_CONFIG": { "USE_OFFLINE_AUGMENTATION": true, "AUGMENTATIONS_PER_FILE": 10, "FORCE_REGENERATE": false },
        "USE_BALANCED_TRAINING_SET": true,
        "TARGET_SAMPLES_PER_CLASS": 800,
        "AUGMENTATION_CONFIG": { "METHODS": { "NOISE_INJECTION": true, "PITCH_SHIFTING": true, "TIME_SHIFTING": true, "TIME_STRETCHING": true }, "PARAMS": { "NOISE_LEVEL_RANGE": [0.001, 0.005], "PITCH_SHIFT_STEPS_RANGE": [-4, 4], "TIME_SHIFT_FRACTION_RANGE": [-0.2, 0.2], "TIME_STRETCH_RATE_RANGE": [0.8, 1.2] } },
        "GUARANTEE_ALL_CLASSES_IN_FOLDS": true,
        "CLASS_MAPPING_CONFIG": { "USE_CLASS_MAPPING": true, "CLASS_MAPPING": { "healthy": ["healthy"], "diseased": ["asthma", "copd", "pneumonia"] } },
        "MODELS_TO_RUN": { "CNN": true, "CNN_Attention": true, "CNN-LSTM": false, "CNN-BiLSTM": false, "CNN-GRU": false, "CNN-BiLSTM_Attention": false, "Logistic Regression": false, "SVM": false, "KNN": false, "Random Forest": false, "Gradient Boosting": false },
        "HYPERPARAMETER_TUNING_CONFIG": { "USE_HYPERPARAMETER_TUNING": false, "SKLEARN_TUNER_TYPE": "random", "N_ITER_RANDOM_SEARCH": 20, "KERAS_TUNER_TYPE": "hyperband" },
        "N_SPLITS_CV": 5,
        "USE_REPEATED_CV": false,
        "N_REPEATS": 3,
        "NESTED_CV_CONFIG": { "USE_NESTED_CV": false, "N_SPLITS_INNER_CV": 3 },
        "FINAL_TEST_SET_SIZE_PATIENTS": 0.2,
        "EPOCHS": 150, "BATCH_SIZE": 32, "L2_REG": 0.001,
        "LOSS_FUNCTION": "dice",
        "SPATIAL_ATTENTION_POOLING_TYPE": "avg",
        "BOOTSTRAP_CONFIG": { "RUN_BOOTSTRAP_ANALYSIS": true, "N_BOOTSTRAP_SAMPLES": 1000 },
        "XAI_CONFIG": { "RUN_SAMPLE_CENTRIC_XAI": true, "RUN_GRADCAM": true, "RUN_SALIENCY": false, "RUN_SHAP": false, "NUM_XAI_SAMPLES": 3, "Y_AXIS_SCALE": "linear", "XAI_SAVE_INDIVIDUAL_PLOTS": false, "XAI_SHOW_OVERLAYS": false },
    });

    const getInitialClassMapping = () => ([
        { target: 'diseased', sources: ['asthma', 'copd', 'pneumonia'] },
        { target: 'healthy', sources: ['healthy'] }
    ]);
    
    const getInitialSelectedClasses = () => (['asthma', 'copd', 'pneumonia', 'healthy']);

    const [params, setParams] = useState(getInitialParams());
    const [selectedSourceClasses, setSelectedSourceClasses] = useState(getInitialSelectedClasses());
    const [classMapping, setClassMapping] = useState(getInitialClassMapping());
    
    const [generatedCode, setGeneratedCode] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
    const fileInputRef = useRef(null);

    const showNotification = (message, type = 'success', duration = 3000) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: 'success' });
        }, duration);
    };

    const handleParamChange = useCallback((key, value) => setParams(p => ({ ...p, [key]: value })), []);
    const handleNestedChange = useCallback((mainKey, subKey, value) => setParams(p => ({ ...p, [mainKey]: { ...p[mainKey], [subKey]: value } })), []);
    const handleSubNestedChange = useCallback((mainKey, subKey, subSubKey, value) => setParams(p => ({ ...p, [mainKey]: { ...p[mainKey], [subKey]: { ...p[mainKey][subKey], [subSubKey]: value } } })), []);
    const handleAugmentationRangeChange = useCallback((param, index, value) => {
        setParams(p => {
            const newRange = [...p.AUGMENTATION_CONFIG.PARAMS[param]];
            newRange[index] = parseFloat(value) || 0;
            return { ...p, AUGMENTATION_CONFIG: { ...p.AUGMENTATION_CONFIG, PARAMS: { ...p.AUGMENTATION_CONFIG.PARAMS, [param]: newRange } } };
        });
    }, []);

    const handleSourceClassToggle = (className) => {
        setSelectedSourceClasses(prev => {
            const newSelection = prev.includes(className) ? prev.filter(c => c !== className) : [...prev, className];
            // Also update the class mapping to remove any sources that are no longer selected
            setClassMapping(currentMapping => currentMapping.map(group => ({
                ...group,
                sources: group.sources.filter(s => newSelection.includes(s))
            })).filter(group => group.sources.length > 0 || group.target !== '')); // remove empty groups
            return newSelection;
        });
    };

    const addTargetGroup = () => {
        setClassMapping(prev => [...prev, { target: `new_group_${prev.length + 1}`, sources: [] }]);
    };

    const removeTargetGroup = (index) => {
        setClassMapping(prev => prev.filter((_, i) => i !== index));
    };

    const handleTargetNameChange = (index, newName) => {
        setClassMapping(prev => prev.map((group, i) => i === index ? { ...group, target: newName } : group));
    };

    const handleSourceInclusionChange = (groupIndex, sourceClass) => {
        setClassMapping(prev => prev.map((group, i) => {
            if (i === groupIndex) {
                const newSources = group.sources.includes(sourceClass)
                    ? group.sources.filter(s => s !== sourceClass)
                    : [...group.sources, sourceClass];
                return { ...group, sources: newSources };
            }
            return group;
        }));
    };

    const formatPythonValue = (value, indentLevel = 1) => {
        const indent = '    '.repeat(indentLevel);
        const nextIndent = '    '.repeat(indentLevel + 1);
        if (value === null) return 'None';
        if (typeof value === 'boolean') return value ? 'True' : 'False';
        if (typeof value === 'string') return `'${value}'`;
        if (typeof value === 'number') return value;
        if (Array.isArray(value)) {
            if (value.length === 0) return '[]';
            const formattedItems = value.map(v => formatPythonValue(v, indentLevel + 1));
            return `[${formattedItems.join(', ')}]`;
        }
        if (typeof value === 'object') {
            const keys = Object.keys(value);
            if (keys.length === 0) return '{}';
            const formattedEntries = keys.map(key => {
                const formattedKey = `'${key}'`;
                const formattedValue = formatPythonValue(value[key], indentLevel + 1);
                return `${nextIndent}${formattedKey}: ${formattedValue}`;
            });
            return `{\n${formattedEntries.join(',\n')}\n${indent}}`;
        }
        return String(value);
    };

    const generatePythonCode = useCallback(() => {
        const p = JSON.parse(JSON.stringify(params)); // Deep copy
        
        p.USE_DICE_LOSS = p.LOSS_FUNCTION === 'dice';
        p.USE_FOCAL_LOSS = p.LOSS_FUNCTION === 'focal';
        delete p.LOSS_FUNCTION;
        
        const finalClassMapping = classMapping.reduce((acc, group) => {
            if (group.target && group.sources.length > 0) {
                acc[group.target] = group.sources;
            }
            return acc;
        }, {});

        const useMapping = p.CLASS_MAPPING_CONFIG?.USE_CLASS_MAPPING && Object.keys(finalClassMapping).length > 0;
        
        p.CLASS_MAPPING_CONFIG = {
            USE_CLASS_MAPPING: useMapping,
            CLASS_MAPPING: finalClassMapping
        };
        
        p.TARGET_CLASSES = useMapping ? Object.keys(finalClassMapping) : selectedSourceClasses;

        const codeString = Object.entries(p)
            .map(([key, value]) => {
                let formattedValue;
                if (key === 'TARGET_CLASSES') {
                    formattedValue = `sorted(${formatPythonValue(value, 1)})`;
                } else {
                    formattedValue = formatPythonValue(value, 1);
                }
                return `    "${key}": ${formattedValue},`;
            })
            .join('\n');

        const finalCode = `# --- Parameters for Cell 7: Main Execution Block ---\n# This code block was generated by the interactive UI.\n# You can copy and paste it directly at the beginning of Cell 7 in your Colab notebook.\n\nexperiment_parameters = {\n${codeString}\n}`;
        
        setGeneratedCode(finalCode);
    }, [params, classMapping, selectedSourceClasses]);

    useEffect(() => { generatePythonCode(); }, [generatePythonCode]);

    const copyToClipboard = () => {
        const textArea = document.createElement("textarea");
        textArea.value = generatedCode;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setCopySuccess('Failed!');
            setTimeout(() => setCopySuccess(''), 2000);
        }
        document.body.removeChild(textArea);
    };

    const handleReset = () => {
        setParams(getInitialParams());
        setClassMapping(getInitialClassMapping());
        setSelectedSourceClasses(getInitialSelectedClasses());
        showNotification('Configuration has been reset to default values.');
    };

    const handleSaveConfig = () => {
        const configToSave = {
            params,
            classMapping,
            selectedSourceClasses,
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configToSave, null, 4));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "experiment_config.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        showNotification('Configuration saved as experiment_config.json');
    };

    const handleLoadConfig = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const loadedConfig = JSON.parse(e.target.result);
                if (loadedConfig.params && loadedConfig.classMapping && loadedConfig.selectedSourceClasses) {
                    setParams(loadedConfig.params);
                    setClassMapping(loadedConfig.classMapping);
                    setSelectedSourceClasses(loadedConfig.selectedSourceClasses);
                    showNotification('Configuration loaded successfully!');
                } else {
                    showNotification('Invalid configuration file format.', 'error');
                }
            } catch (error) {
                console.error("Failed to parse config file:", error);
                showNotification('Error loading or parsing configuration file.', 'error');
            }
             if(fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 lg:p-8 font-sans">
            {notification.show && (
                <div className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white z-50 transition-transform transform-gpu animate-pulse ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {notification.message}
                </div>
            )}
            <div className="max-w-screen-2xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
                    Comprehensive Experiment Parameter Generator
                </h1>
                <p className="text-center text-gray-400 mb-6">
                    Interactively configure all experiment parameters and generate the Python code needed for <strong>Cell 7</strong>.
                </p>

                <div className="mb-6 bg-gray-800/50 p-4 rounded-2xl shadow-lg border border-gray-700/50 flex items-center justify-center flex-wrap gap-4">
                    <button onClick={handleSaveConfig} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"> <SaveIcon /> Save Config </button>
                    <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"> <UploadIcon /> Load Config </button>
                    <input type="file" ref={fileInputRef} onChange={handleLoadConfig} accept=".json" style={{ display: 'none' }} />
                    <button onClick={handleReset} className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"> <ResetIcon /> Reset to Default </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-6">
                        <Section title="Basic Configuration" icon={<SettingsIcon />}>
                            <TextInput label="Experiment Version Tag" value={params.FEATURE_SET_VERSION} onChange={(e) => handleParamChange('FEATURE_SET_VERSION', e.target.value)} helpText="For naming report files."/>
                            <Checkbox label="Save Best Models" checked={params.SAVE_BEST_MODELS} onChange={(e) => handleParamChange('SAVE_BEST_MODELS', e.target.checked)} />
                            <Checkbox label="Create PDF Report" checked={params.CREATE_PDF_REPORT} onChange={(e) => handleParamChange('CREATE_PDF_REPORT', e.target.checked)} />
                        </Section>
                        <Section title="Data Sources" icon={<SettingsIcon />}>
                             <p className="text-gray-300 font-semibold text-sm">Classes to include in the experiment</p>
                             <div className="grid grid-cols-2 gap-2">
                                 {ALL_AVAILABLE_CLASSES.map(className => (
                                     <Checkbox key={className} label={className} checked={selectedSourceClasses.includes(className)} onChange={() => handleSourceClassToggle(className)} />
                                 ))}
                             </div>
                        </Section>
                        <Section title="Feature & Audio Processing" icon={<SettingsIcon />}>
                            <Checkbox label="Use Spectrogram" checked={params.USE_SPECTROGRAM} onChange={(e) => handleParamChange('USE_SPECTROGRAM', e.target.checked)} />
                            <Checkbox label="Use MFCC" checked={params.USE_MFCC} onChange={(e) => handleParamChange('USE_MFCC', e.target.checked)} />
                            {params.USE_MFCC && (
                                <div className="pl-6 border-l-2 border-cyan-700 space-y-2 mt-2">
                                    <Checkbox label="Delta Features" checked={params.USE_DELTA_FEATURES} onChange={(e) => handleParamChange('USE_DELTA_FEATURES', e.target.checked)} />
                                    <Checkbox label="Delta-Delta Features" checked={params.USE_DELTA_DELTA_FEATURES} onChange={(e) => handleParamChange('USE_DELTA_DELTA_FEATURES', e.target.checked)} />
                                </div>
                            )}
                            <div className="mt-4 border-t border-gray-700/50 pt-4">
                                <p className="text-gray-300 mb-2 font-semibold text-sm">Transfer Learning</p>
                                <Checkbox label="Use YAMNet Embeddings" checked={params.PRE_TRAINED_MODELS_CONFIG?.USE_YAMNET} onChange={(e) => handleNestedChange('PRE_TRAINED_MODELS_CONFIG', 'USE_YAMNET', e.target.checked)} />
                                <Checkbox label="Use VGGish Embeddings" checked={params.PRE_TRAINED_MODELS_CONFIG?.USE_VGGISH} onChange={(e) => handleNestedChange('PRE_TRAINED_MODELS_CONFIG', 'USE_VGGISH', e.target.checked)} />
                            </div>
                        </Section>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-6">
                        <Section title="Target Class Grouping" icon={<SettingsIcon />}>
                            <Checkbox label="Use Custom Class Mapping" checked={params.CLASS_MAPPING_CONFIG?.USE_CLASS_MAPPING} onChange={(e) => handleNestedChange('CLASS_MAPPING_CONFIG', 'USE_CLASS_MAPPING', e.target.checked)} />
                            {params.CLASS_MAPPING_CONFIG?.USE_CLASS_MAPPING && (
                                <>
                                    {classMapping.map((group, groupIndex) => (
                                        <div key={groupIndex} className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                            <div className="flex items-center gap-2 mb-2">
                                                <input type="text" value={group.target} onChange={(e) => handleTargetNameChange(groupIndex, e.target.value)} placeholder="Target Class Name" className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-2 py-1 text-white focus:ring-1 focus:ring-cyan-500"/>
                                                <button onClick={() => removeTargetGroup(groupIndex)} className="p-1 bg-red-800/50 hover:bg-red-700/50 rounded-md text-red-300"><TrashIcon /></button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                {selectedSourceClasses.map(sourceClass => (
                                                    <label key={sourceClass} className="flex items-center gap-1.5 p-1">
                                                        <input type="checkbox" checked={group.sources.includes(sourceClass)} onChange={() => handleSourceInclusionChange(groupIndex, sourceClass)} className="accent-cyan-500 w-4 h-4 bg-gray-700 border-gray-500 rounded" />
                                                        <span>{sourceClass}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={addTargetGroup} className="w-full flex items-center justify-center gap-2 bg-cyan-800/50 hover:bg-cyan-700/50 text-cyan-200 font-bold py-2 px-4 rounded-lg transition-colors"><AddIcon /> Add New Group</button>
                                </>
                            )}
                        </Section>
                        <Section title="Data Augmentation & Balancing" icon={<SettingsIcon />}>
                            <Checkbox label="Apply Augmentation" checked={params.APPLY_OVERSAMPLING} onChange={(e) => handleParamChange('APPLY_OVERSAMPLING', e.target.checked)} helpText="Enables the settings below."/>
                            {params.APPLY_OVERSAMPLING && (
                                <div className="pl-4 mt-2 space-y-4 border-l-2 border-cyan-700">
                                    <Checkbox label="Offline Augmentation" checked={params.OFFLINE_AUGMENTATION_CONFIG?.USE_OFFLINE_AUGMENTATION} onChange={(e) => handleNestedChange('OFFLINE_AUGMENTATION_CONFIG', 'USE_OFFLINE_AUGMENTATION', e.target.checked)} />
                                    {params.OFFLINE_AUGMENTATION_CONFIG?.USE_OFFLINE_AUGMENTATION && (
                                        <div className="pl-4 space-y-2">
                                            <NumberInput label="Augmentations per File" value={params.OFFLINE_AUGMENTATION_CONFIG?.AUGMENTATIONS_PER_FILE} onChange={(e) => handleNestedChange('OFFLINE_AUGMENTATION_CONFIG', 'AUGMENTATIONS_PER_FILE', e.target.value)} />
                                            <Checkbox label="Force Regenerate Cache" checked={params.OFFLINE_AUGMENTATION_CONFIG?.FORCE_REGENERATE} onChange={(e) => handleNestedChange('OFFLINE_AUGMENTATION_CONFIG', 'FORCE_REGENERATE', e.target.checked)} />
                                        </div>
                                    )}
                                    <div className="mt-2 pt-2 border-t border-gray-700/50">
                                        <Checkbox label="Use Balanced Training Set" checked={params.USE_BALANCED_TRAINING_SET} onChange={(e) => handleParamChange('USE_BALANCED_TRAINING_SET', e.target.checked)} helpText="Upsamples minority classes."/>
                                        {params.USE_BALANCED_TRAINING_SET && (
                                            <div className="pl-4 mt-2">
                                                <NumberInput label="Target Samples per Class" value={params.TARGET_SAMPLES_PER_CLASS} onChange={(e) => handleParamChange('TARGET_SAMPLES_PER_CLASS', e.target.value)} />
                                            </div>
                                        )}
                                    </div>
                                     <div className="mt-2 pt-2 border-t border-gray-700/50">
                                         <p className="text-gray-300 mb-2 font-semibold text-sm">Augmentation Methods</p>
                                         <div className="grid grid-cols-2 gap-2">
                                             {Object.keys(params.AUGMENTATION_CONFIG?.METHODS || {}).map(method => (
                                                 <Checkbox key={method} label={method.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} checked={params.AUGMENTATION_CONFIG.METHODS[method]} onChange={(e) => handleSubNestedChange('AUGMENTATION_CONFIG', 'METHODS', method, e.target.checked)} />
                                             ))}
                                         </div>
                                     </div>
                                </div>
                            )}
                        </Section>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-6">
                        <Section title="Model Selection & Training" icon={<SettingsIcon />}>
                            <p className="text-gray-300 font-semibold text-sm">Models to Run</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {Object.keys(params.MODELS_TO_RUN).map(modelName => ( <Checkbox key={modelName} label={modelName} checked={params.MODELS_TO_RUN[modelName]} onChange={(e) => handleNestedChange('MODELS_TO_RUN', modelName, e.target.checked)} /> ))}
                            </div>
                            <div className="mt-4 border-t border-gray-700/50 pt-4 space-y-4">
                                <RadioGroup label="Loss Function" name="loss_function" selectedValue={params.LOSS_FUNCTION} onChange={(e) => handleParamChange('LOSS_FUNCTION', e.target.value)}
                                    options={[ { value: 'standard', label: 'Standard Cross-Entropy' }, { value: 'dice', label: 'Dice Loss' }, { value: 'focal', label: 'Focal Loss' } ]} />
                                <RadioGroup label="Attention Pooling Type" name="pooling_type" selectedValue={params.SPATIAL_ATTENTION_POOLING_TYPE} onChange={(e) => handleParamChange('SPATIAL_ATTENTION_POOLING_TYPE', e.target.value)}
                                    options={[ { value: 'avg', label: 'Average Pooling' }, { value: 'max', label: 'Max Pooling' }, { value: 'attention', label: 'Attention Pooling' } ]} />
                                <NumberInput label="L2 Regularization" value={params.L2_REG} onChange={(e) => handleParamChange('L2_REG', parseFloat(e.target.value))} step={0.001} format="float"/>
                            </div>
                        </Section>
                        <Section title="Hyperparameter Optimization" icon={<SettingsIcon />}>
                            <Checkbox label="Enable Optimization" checked={params.HYPERPARAMETER_TUNING_CONFIG?.USE_HYPERPARAMETER_TUNING} onChange={(e) => handleNestedChange('HYPERPARAMETER_TUNING_CONFIG', 'USE_HYPERPARAMETER_TUNING', e.target.checked)} helpText="Significantly increases experiment time."/>
                            {params.HYPERPARAMETER_TUNING_CONFIG?.USE_HYPERPARAMETER_TUNING && (
                                <div className="pl-6 mt-2 space-y-4 border-l-2 border-cyan-700">
                                    <RadioGroup label="Scikit-learn Tuner" name="sklearn_tuner" selectedValue={params.HYPERPARAMETER_TUNING_CONFIG.SKLEARN_TUNER_TYPE} onChange={(e) => handleNestedChange('HYPERPARAMETER_TUNING_CONFIG', 'SKLEARN_TUNER_TYPE', e.target.value)}
                                        options={[ { value: 'random', label: 'Random Search' }, { value: 'grid', label: 'Grid Search' } ]} />
                                    <NumberInput label="Random Search Iterations" value={params.HYPERPARAMETER_TUNING_CONFIG.N_ITER_RANDOM_SEARCH} onChange={(e) => handleNestedChange('HYPERPARAMETER_TUNING_CONFIG', 'N_ITER_RANDOM_SEARCH', e.target.value)} />
                                    <RadioGroup label="Keras Tuner" name="keras_tuner" selectedValue={params.HYPERPARAMETER_TUNING_CONFIG.KERAS_TUNER_TYPE} onChange={(e) => handleNestedChange('HYPERPARAMETER_TUNING_CONFIG', 'KERAS_TUNER_TYPE', e.target.value)}
                                        options={[ { value: 'hyperband', label: 'Hyperband' }, { value: 'random', label: 'Random Search' } ]} />
                                </div>
                            )}
                        </Section>
                    </div>
                    
                    {/* Column 4 */}
                    <div className="flex flex-col gap-6">
                        <Section title="Data Splitting & CV" icon={<SettingsIcon />}>
                            <Checkbox label="Use Nested CV" checked={params.NESTED_CV_CONFIG?.USE_NESTED_CV} onChange={(e) => handleNestedChange('NESTED_CV_CONFIG', 'USE_NESTED_CV', e.target.checked)} helpText="Used instead of a final hold-out test set."/>
                            {params.NESTED_CV_CONFIG?.USE_NESTED_CV ? (
                                <div className="pl-6 mt-2">
                                     <NumberInput label="Inner CV Folds" value={params.NESTED_CV_CONFIG.N_SPLITS_INNER_CV} onChange={(e) => handleNestedChange('NESTED_CV_CONFIG', 'N_SPLITS_INNER_CV', e.target.value)} min={2} />
                                </div>
                            ) : (
                                <NumberInput label="Final Test Set Ratio" value={params.FINAL_TEST_SET_SIZE_PATIENTS} onChange={(e) => handleParamChange('FINAL_TEST_SET_SIZE_PATIENTS', parseFloat(e.target.value))} min={0.1} max={0.5} step={0.05} format="float"/>
                            )}
                            <NumberInput label="CV Folds (Outer)" value={params.N_SPLITS_CV} onChange={(e) => handleParamChange('N_SPLITS_CV', e.target.value)} min={2} />
                            <Checkbox label="Use Repeated CV" checked={params.USE_REPEATED_CV} onChange={(e) => handleParamChange('USE_REPEATED_CV', e.target.checked)} />
                            {params.USE_REPEATED_CV && ( <NumberInput label="Number of Repeats" value={params.N_REPEATS} onChange={(e) => handleParamChange('N_REPEATS', e.target.value)} min={2} /> )}
                            <Checkbox label="Guarantee All Classes in Folds" checked={params.GUARANTEE_ALL_CLASSES_IN_FOLDS} onChange={(e) => handleParamChange('GUARANTEE_ALL_CLASSES_IN_FOLDS', e.target.checked)} />
                        </Section>
                        <Section title="Analysis & XAI" icon={<SettingsIcon />}>
                            <Checkbox label="Run Bootstrap Analysis" checked={params.BOOTSTRAP_CONFIG?.RUN_BOOTSTRAP_ANALYSIS} onChange={(e) => handleNestedChange('BOOTSTRAP_CONFIG', 'RUN_BOOTSTRAP_ANALYSIS', e.target.checked)} />
                            {params.BOOTSTRAP_CONFIG?.RUN_BOOTSTRAP_ANALYSIS && (
                                <div className="pl-6 mt-2">
                                    <NumberInput label="Bootstrap Samples" value={params.BOOTSTRAP_CONFIG.N_BOOTSTRAP_SAMPLES} onChange={(e) => handleNestedChange('BOOTSTRAP_CONFIG', 'N_BOOTSTRAP_SAMPLES', e.target.value)} />
                                </div>
                            )}
                            <div className="mt-4 border-t border-gray-700/50 pt-4">
                                <Checkbox label="Run Sample-Centric XAI" checked={params.XAI_CONFIG?.RUN_SAMPLE_CENTRIC_XAI} onChange={(e) => handleNestedChange('XAI_CONFIG', 'RUN_SAMPLE_CENTRIC_XAI', e.target.checked)} />
                                {params.XAI_CONFIG?.RUN_SAMPLE_CENTRIC_XAI && (
                                    <div className="pl-6 mt-2 space-y-2">
                                        <Checkbox label="Grad-CAM" checked={params.XAI_CONFIG.RUN_GRADCAM} onChange={(e) => handleNestedChange('XAI_CONFIG', 'RUN_GRADCAM', e.target.checked)} />
                                        <Checkbox label="Saliency Map" checked={params.XAI_CONFIG.RUN_SALIENCY} onChange={(e) => handleNestedChange('XAI_CONFIG', 'RUN_SALIENCY', e.target.checked)} />
                                        <Checkbox label="SHAP Analysis" checked={params.XAI_CONFIG.RUN_SHAP} onChange={(e) => handleNestedChange('XAI_CONFIG', 'RUN_SHAP', e.target.checked)} helpText="Can be very slow"/>
                                        <Checkbox label="Save Individual Plots" checked={params.XAI_CONFIG.XAI_SAVE_INDIVIDUAL_PLOTS} onChange={(e) => handleNestedChange('XAI_CONFIG', 'XAI_SAVE_INDIVIDUAL_PLOTS', e.target.checked)} />
                                        <Checkbox label="Show Heatmap Overlays" checked={params.XAI_CONFIG.XAI_SHOW_OVERLAYS} onChange={(e) => handleNestedChange('XAI_CONFIG', 'XAI_SHOW_OVERLAYS', e.target.checked)} />
                                    </div>
                                )}
                            </div>
                        </Section>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-cyan-400 flex items-center"> <CodeIcon /> Generated Python Code (for Cell 7) </h2>
                        <button onClick={copyToClipboard} className="bg-gray-700 hover:bg-cyan-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm"> <ClipboardIcon /> {copySuccess || 'Copy'} </button>
                    </div>
                    <div className="relative">
                        <textarea readOnly value={generatedCode} rows="25" className="w-full bg-gray-900/80 border border-gray-700 rounded-xl p-4 font-mono text-sm text-green-300 whitespace-pre-wrap focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}
